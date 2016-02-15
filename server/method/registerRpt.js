Meteor.methods({
   registerRpt(fromDate, toDate){
       ///
       let data = {};
       let total = 0;

       fromDate = moment(fromDate).toDate();
       toDate = moment(toDate).toDate();

       data.header = {
           date: moment(fromDate).format('DD/MM/YYYY') + ' - ' + moment(toDate).format('DD/MM/YYYY')
       };

       let selector = {
           regDate: {$gte: fromDate, $lte: toDate}
       };
       let option = {$sort: {regDate: 1}};

       let tempContent = Collection.Register.find(selector, option);
       let content = [];
       tempContent.forEach(function (obj) {
           total += obj.amount;
           // find student
           let studentDoc = Collection.Student.findOne(obj.studentId);
           obj._student = studentDoc;

           // find subject
           let subjectDoc = Collection.Subject.findOne(obj.subjectId);
           obj._subject = subjectDoc;

           content.push(obj);
       });

       data.content = content;
       data.amount = total;

       return data;
   }
});