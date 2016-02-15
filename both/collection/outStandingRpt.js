
Schema.outStandingRpt = new SimpleSchema({
    asAt: {
        type: Date,
        label: "As At",
        defaultValue: moment().toDate(),
        autoform: {
            type: "bootstrap-datetimepicker",
            afFieldInput: {
                dateTimePickerOptions: {
                    format: 'DD/MM/YYYY',
                    pickTime: false
                }
            }

        }
    }

});