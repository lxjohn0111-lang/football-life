// One authoritative event stream for everything that happens in a match.
// Statistics, audio, HUD notifications and effects all subscribe here.

export class EventBus {
  constructor() {
    this.handlers = new Map();
    this.log = [];
    this.nextId = 1;
    this.maxLog = 4000;
  }
  on(type, fn) {
    if (!this.handlers.has(type)) this.handlers.set(type, []);
    this.handlers.get(type).push(fn);
    return () => {
      const arr = this.handlers.get(type);
      const i = arr.indexOf(fn);
      if (i >= 0) arr.splice(i, 1);
    };
  }
  emit(type, data) {
    const e = Object.assign({ id: this.nextId++, type }, data);
    this.log.push(e);
    if (this.log.length > this.maxLog) this.log.splice(0, this.log.length - this.maxLog);
    const list = this.handlers.get(type);
    if (list) for (let i = 0; i < list.length; i++) list[i](e);
    const all = this.handlers.get('*');
    if (all) for (let i = 0; i < all.length; i++) all[i](e);
    return e;
  }
}
