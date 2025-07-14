export type Action = "none" | "soundAlarm" | "stopAlarm";

interface AlarmState {
  setAlarm(): Action;
  cancelAlarm(): Action;
  reachedToAlarmTime(): Action;
  snooze(): Action;
  elapseSnoozeTime(): Action;
}

// 状態オブジェクトに振る舞いを委譲する
export class AlarmClock {
  private state: AlarmState;

  constructor() {
    this.state = new NormalState(this);
  }

  public setState(state: AlarmState): void {
    this.state = state;
  }

  // https://tech-blog.s-yoshiki.com/entry/241
  public getStateName(): string {
    return this.state.constructor.name;
  }

  public setAlarm(): Action {
    return this.state.setAlarm();
  }

  public cancelAlarm(): Action {
    return this.state.cancelAlarm();
  }

  public reachedToAlarmTime(): Action {
    return this.state.reachedToAlarmTime();
  }

  public snooze(): Action {
    return this.state.snooze();
  }

  public elapseSnoozeTime(): Action {
    return this.state.elapseSnoozeTime();
  }
}

// 目覚まし時計の状態

// 通常
export class NormalState implements AlarmState {
  constructor(private context: AlarmClock) {}
  // 通常 --> アラームセット中: アラーム設定
  setAlarm(): Action {
    this.context.setState(new AlarmSetState(this.context));
    return "none";
  }

  cancelAlarm(): Action {
    return "none";
  }

  reachedToAlarmTime(): Action {
    return "none";
  }

  snooze(): Action {
    return "none";
  }

  elapseSnoozeTime(): Action {
    return "none";
  }
}

// アラームセット中
export class AlarmSetState implements AlarmState {
  constructor(private context: AlarmClock) {}

  setAlarm(): Action {
    return "none";
  }
  //アラームセット中 --> 通常: アラーム解除
  cancelAlarm(): Action {
    this.context.setState(new NormalState(this.context));
    return "none";
  }
  //アラームセット中 --> アラーム鳴動中: アラーム設定時刻到達
  reachedToAlarmTime(): Action {
    this.context.setState(new AlarmSoundingState(this.context));
    return "soundAlarm";
  }

  snooze(): Action {
    return "none";
  }

  elapseSnoozeTime(): Action {
    return "none";
  }
}

// アラーム鳴動中
export class AlarmSoundingState implements AlarmState {
  constructor(private context: AlarmClock) {}

  setAlarm(): Action {
    return "none";
  }
  //アラーム鳴動中 --> 通常: アラーム解除
  cancelAlarm(): Action {
    this.context.setState(new NormalState(this.context));
    return "stopAlarm";
  }

  reachedToAlarmTime(): Action {
    return "none";
  }
  //アラーム鳴動中 --> スヌーズ中: スヌーズ
  snooze(): Action {
    this.context.setState(new SnoozingState(this.context));
    return "stopAlarm";
  }

  elapseSnoozeTime(): Action {
    return "none";
  }
}

// スヌーズ中
export class SnoozingState implements AlarmState {
  constructor(private context: AlarmClock) {}

  setAlarm(): Action {
    return "none";
  }
  //スヌーズ中 --> 通常: アラーム解除
  cancelAlarm(): Action {
    this.context.setState(new NormalState(this.context));
    return "none";
  }

  reachedToAlarmTime(): Action {
    return "none";
  }

  snooze(): Action {
    return "none";
  }
  //スヌーズ中 --> アラーム鳴動中: スヌーズ設定時間経過
  elapseSnoozeTime(): Action {
    this.context.setState(new AlarmSoundingState(this.context));
    return "soundAlarm";
  }
}
