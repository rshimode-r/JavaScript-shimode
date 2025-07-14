import {
  AlarmClock,
  NormalState,
  AlarmSetState,
  AlarmSoundingState,
  SnoozingState,
  Action,
} from "./index.ts";

describe("AlarmClock", () => {
  const states = [
    ["NormalState", NormalState],
    ["AlarmSetState", AlarmSetState],
    ["AlarmSoundingState", AlarmSoundingState],
    ["SnoozingState", SnoozingState],
  ] as const;

  const events = [
    ["setAlarm", (c: AlarmClock) => c.setAlarm()],
    ["cancelAlarm", (c: AlarmClock) => c.cancelAlarm()],
    ["reachedToAlarmTime", (c: AlarmClock) => c.reachedToAlarmTime()],
    ["snooze", (c: AlarmClock) => c.snooze()],
    ["elapseSnoozeTime", (c: AlarmClock) => c.elapseSnoozeTime()],
  ] as const;

  const expectations: Record<
    string,
    Record<string, { next: string; action: Action }>
  > = {
    NormalState: {
      setAlarm: { next: "AlarmSetState", action: "none" },
      cancelAlarm: { next: "NormalState", action: "none" },
      reachedToAlarmTime: { next: "NormalState", action: "none" },
      snooze: { next: "NormalState", action: "none" },
      elapseSnoozeTime: { next: "NormalState", action: "none" },
    },
    AlarmSetState: {
      setAlarm: { next: "AlarmSetState", action: "none" },
      cancelAlarm: { next: "NormalState", action: "none" },
      reachedToAlarmTime: { next: "AlarmSoundingState", action: "soundAlarm" },
      snooze: { next: "AlarmSetState", action: "none" },
      elapseSnoozeTime: { next: "AlarmSetState", action: "none" },
    },
    AlarmSoundingState: {
      setAlarm: { next: "AlarmSoundingState", action: "none" },
      cancelAlarm: { next: "NormalState", action: "stopAlarm" },
      reachedToAlarmTime: { next: "AlarmSoundingState", action: "none" },
      snooze: { next: "SnoozingState", action: "stopAlarm" },
      elapseSnoozeTime: { next: "AlarmSoundingState", action: "none" },
    },
    SnoozingState: {
      setAlarm: { next: "SnoozingState", action: "none" },
      cancelAlarm: { next: "NormalState", action: "none" },
      reachedToAlarmTime: { next: "SnoozingState", action: "none" },
      snooze: { next: "SnoozingState", action: "none" },
      elapseSnoozeTime: { next: "AlarmSoundingState", action: "soundAlarm" },
    },
  };

  for (const [stateName, StateClass] of states) {
    describe(stateName, () => {
      for (const [eventName, eventFunction] of events) {
        const { next, action } = expectations[stateName][eventName];
        it(`${eventName}を呼び出すと${next}に遷移し、アクション${action}が返る`, () => {
          const clock = new AlarmClock();
          clock.setState(new StateClass(clock));
          const result = eventFunction(clock);
          expect(result).toBe(action);
          expect(clock.getStateName()).toBe(next);
        });
      }
    });
  }
});
