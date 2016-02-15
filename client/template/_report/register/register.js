// Generate
Template.registerRptGen.helpers({
    data(){
        let fromDate = FlowRouter.getQueryParam('fromDate');
        let toDate = FlowRouter.getQueryParam('toDate');
        Meteor.call('registerRpt', fromDate, toDate,function (error,result) {
           if(!error){
               Session.set('registerRptResult', result)
           }
        });
        return Session.get('registerRptResult');
        //let data = {};
        //let total = 0;
        //
        //let fromDate = FlowRouter.getQueryParam('fromDate');
        //fromDate = moment(fromDate).toDate();
        //let toDate = FlowRouter.getQueryParam('toDate');
        //toDate = moment(toDate).toDate();
        //
        //data.header = {
        //    date: moment(fromDate).format('DD/MM/YYYY') + ' - ' + moment(toDate).format('DD/MM/YYYY')
        //};
        //
        //let selector = {
        //    regDate: {$gte: fromDate, $lte: toDate}
        //};
        //let option = {$sort: {regDate: 1}};
        //
        //let tempContent = Collection.Register.find(selector, option);
        //let content = [];
        //tempContent.forEach(function (obj) {
        //    total += obj.amount;
        //    // find student
        //    let studentDoc = Collection.Student.findOne(obj.studentId);
        //    obj._student = studentDoc;
        //
        //    // find subject
        //    let subjectDoc = Collection.Subject.findOne(obj.subjectId);
        //    obj._subject = subjectDoc;
        //
        //    content.push(obj);
        //});
        //
        //data.content = content;
        //data.amount = total;
        //
        //return data;
    },
    no(index){
        console.log(index);
        return index + 1;
    }
});

//hook
AutoForm.hooks({
        registerRpt: {
            onSubmit(insertDoc, updateDoc, currentDoc){
                this.done(null, insertDoc);
            },
            onSuccess(formType, result){
                let query = result;
                let path = FlowRouter.path('registerRptGen', {}, query);

                window.open(path, '_blank');
            },
            onError(formType, error){
                alertify.error(error.message);
            }
        }
    }
);
