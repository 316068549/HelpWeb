export class Config {
  constructor(
      public imeiCode?: string,
      public functionCode?: number,
      public latitude?: string,
      public longitude?: string,
      public phoneOne?: string,
      public phoneTwo?: string,
      public phoneThree?: string,
      public phoneFour?: string,
      public phoneFive?: string,
      public fenceParams?: string,
      public userName?: string,
      public password ?: string,
      public macAddress ?: string,
      public locationMode ?: number,
      public locationMode2 ?: string,
      public startTime ?: string,
      public endTime?: string,
      public mark?: string,
      public fenceType?: string,
      public controlWord?: string,
      public time?: string,
      public timeInterval?: string,
      public ip?: string,
      public responseType?: string,
      public remindModel?: string,
      public remindInterval?: string,
      public remindFrequency?: string,
      public onceRemindTime?: string,
      public messageLength?: string,
      public message?: string,
      public serialNumber?: string,
      public sosControle?: string,
      public phoneQuantity?: string,
      // public dataLength?: string,
      public fallControle?: string,
      public whiteListSwitch?: string
  ) {
  }
}
