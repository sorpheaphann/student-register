// Generate
Template.paymentRptGen.helpers({
    data(){
        let fromDate = FlowRouter.getQueryParam('fromDate');
        let toDate = FlowRouter.getQueryParam('toDate');
        Meteor.call('paymentRpt', fromDate, toDate, function (error, result) {
            if(!error){
                Session.set('paymentRptResult', result);
            }
        });
        return Session.get('paymentRptResult');
    },
    no(index){
        console.log(index);
        return index + 1;
    }
});

//hook
AutoForm.hooks({
        paymentRpt: {
            onSubmit(insertDoc, updateDoc, currentDoc){
                this.done(null, insertDoc);
            },
            onSuccess(formType, result){
                let query = result;
                let path = FlowRouter.path('paymentRptGen', {}, query);

                window.open(path, '_blank');
            },
            onError(formType, error){
                alertify.error(error.message);
            }
        }
    }
);
