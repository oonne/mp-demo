/// <reference path="./types/index.d.ts" />

// 时间
type Timer = ReturnType<typeof setTimeout> | null;
type Interval = ReturnType<typeof setInterval> | null;