Meteor.methods({
    outStandingRpt(asAt){
        let data = {};
        let totalDueAmount = 0;
        let totalPaidAmount = 0;
        let totalOsAmount = 0;


        asAt = moment(asAt).toDate();//convert to date

        //header
        data.header = {
            date: moment(asAt).format('MMM/DD/YYYY')
        };

        //end header
        let selector = {
            paidDate: {$lte: asAt}
        };
        let option = {$sort: {paidDate: 1}};//??????????????????????


        let tempContent = Collection.Payment.find(selector, option);
        let content = [];
        tempContent.forEach(function (obj) {
            // find student
            let studentDoc = Collection.Student.findOne(obj.studentId);
            obj._student = studentDoc;
            // find subject
            let registerDoc = Collection.Register.findOne(obj.registerId);
            let subjectDoc = Collection.Subject.findOne(registerDoc.subjectId);
            obj._subject = subjectDoc;

            if(obj.osAmount !=0){
                totalDueAmount += obj.dueAmount;
                totalPaidAmount += obj.paidAmount;
                totalOsAmount += obj.osAmount;

                content.push(obj);
            }
        });

        data.dueAmount = totalDueAmount;
        data.paidAmount = totalPaidAmount;
        data.osAmount = totalOsAmount;
        data.content = content;

        return data;
    }
});