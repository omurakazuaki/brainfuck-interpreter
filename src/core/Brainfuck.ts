type Write = (char: number) => void;
type Read = () => number;
type CodePointTracer = (number) => void;
type MemoryTracer = (memory: Int8Array, ptr: number) => void;
type OnChangeStatus = (status: Status) => void;

type Option = {
  codePointTracer?: CodePointTracer;
  MemoryTracer?: MemoryTracer;
  onChangeStatus?: OnChangeStatus;
  write?: Write;
  read?: Read;
  memorySize?: number;
  cellBits?: 8 | 16 | 32;
  commands?: {
    inc: string;
    dec: string;
    nxt: string;
    prv: string;
    put: string;
    get: string;
    opn: string;
    cls: string;
  }
};

export enum Status {
  RUNNING,
  STOPPING,
  STOPPED
}

export class Brainfuck {

  opt: Option;
  memory: Int8Array;
  ptr: number;
  code: string;
  codePointer: number;
  breakPoints: number[];
  status: Status = null;

  commands: string[];
  jumpByOpen;
  jumpByClose;

  constructor(code: string, opt?: Option) {
    this.code = code;
    const defaultOption: Option = {
      codePointTracer: _ => {},
      MemoryTracer: _ => {},
      onChangeStatus: _ => {},
      write: _ => {},
      read: () => -1, // TODO
      memorySize: 1024,
      cellBits: 8,
      commands: {
        inc: '+',
        dec: '-',
        nxt: '>',
        prv: '<',
        put: '.',
        get: ',',
        opn: '[',
        cls: ']',
      }
    }
    this.opt = Object.assign(defaultOption, opt);
    this.reset();
  }

  reset() {
    this.memory = new Int8Array(this.opt.memorySize).fill(0);
    this.ptr = 0;
    this.codePointer = 0;
    const jumpList = this.jumpList();
    this.jumpByOpen = jumpList.reduce((acc, v)=>{
      acc[v[0]] = v[1];
      return acc;
    },{});
    this.jumpByClose = jumpList.reduce((acc, v)=>{
      acc[v[1]] = v[0];
      return acc;
    },{});
    this.commands = Object.values(this.opt.commands);
    this.opt.codePointTracer(this.codePointer);
    this.opt.MemoryTracer(this.memory, this.ptr);
    this.changeStatus(Status.STOPPED);
    this.breakPoints = [];
  }

  jumpList(): number[][] {
    const jumpList = [];
    const commands = Object.values(this.opt.commands);
    let nestCount = 0;
    let start = 0;
    for (let i = 0; this.code[i];) {
      const currentCode = this.code.slice(i);
      const command = commands.find(c => currentCode.startsWith(c));
      if (command === this.opt.commands.opn) {
        if (nestCount === 0) {
          start = i;
        }
        nestCount++;
      } else if (command === this.opt.commands.cls) {
        if (start !== 0) {
          nestCount--;
          if (nestCount < 0) {
            throw Error(`Syntax error: ${this.opt.commands.opn} expected.(index: ${i})`);
          }
          if (nestCount === 0) {
            jumpList.push([start, i]);
            i = start;
            start = 0;
          }
        }
      }
      i += command?.length || 1;
    }
    if (start !== 0) {
      throw Error(`Syntax error: ${this.opt.commands.cls} expected.(index: ${(start)})`);
    }
    return jumpList;
  }

  async run() {
    this.changeStatus(Status.RUNNING);
    while (this.code[this.codePointer] && this.status === Status.RUNNING) {
      await new Promise<void>(resolve =>{
        setTimeout(resolve);
      });
      this.step();
      if (this.breakPoints.includes(this.codePointer)) break;
    }
    this.changeStatus(Status.STOPPED);
  }

  stop() {
    this.changeStatus(Status.STOPPING);
  }

  setBreakPoints(bp: number) {
    if (this.breakPoints.includes(bp)) {
      this.breakPoints = this.breakPoints.filter(e => e !== bp);
    } else {
      this.breakPoints.push(bp);
    }
  }

  step() {
    const currentCode = this.code.slice(this.codePointer);
    const command = this.commands.find(c => currentCode.startsWith(c));
    if (command === this.opt.commands.opn) {
      if (this.memory[this.ptr] === 0) {
        this.codePointer = this.jumpByOpen[this.codePointer];
      }
    } else if (command === this.opt.commands.cls) {
      if (this.memory[this.ptr] !== 0) {
        this.codePointer = this.jumpByClose[this.codePointer] - 1;
      }
    } else if (command === this.opt.commands.nxt) {
      this.ptr = this.ptr < this.opt.memorySize - 1 ? this.ptr + 1 : 0;
    } else if (command === this.opt.commands.prv) {
      this.ptr = this.ptr > 0 ? this.ptr - 1 : this.opt.memorySize - 1;
    } else if (command === this.opt.commands.inc) {
      this.memory[this.ptr]++;
    } else if (command === this.opt.commands.dec) {
      this.memory[this.ptr]--;
    } else if (command === this.opt.commands.put) {
      this.opt.write(this.memory[this.ptr]);
    } else if (command === this.opt.commands.get) {
      this.memory[this.ptr] = this.opt.read() || 0;
    } else {
      // do nothing
    }
    this.codePointer += command?.length || 1;
    this.opt.codePointTracer(this.codePointer);
    this.opt.MemoryTracer(this.memory, this.ptr);
  }

  changeStatus(status: Status) {
    if (this.status !== status) {
      this.status = status;
      this.opt.onChangeStatus(status);
    }
  }
};
