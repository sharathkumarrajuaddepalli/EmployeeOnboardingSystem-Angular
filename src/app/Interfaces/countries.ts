export interface Countries {
    currency: String,
    flag: String,
    isoCode: String
    latitude: DoubleRange,
    longitude: DoubleRange,
    name: String
    phonecode: String
    timezones:
    [
        {
            abbreviation: String,
            gmtOffset: Number,
            gmtOffsetName: String,
            tzName: String,
            zoneName: String
        }
    ]
}
