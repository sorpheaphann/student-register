// Generate
Template.outStandingRptGen.helpers({
    data(){ //method
        let asAt = FlowRouter.getQueryParam('asAt');//string
        Meteor.call('outStandingRpt', asAt, function (error, result) {
            if (!error) {
                Session.set('outStandingRptResult', result);
            }
        });
        return Session.get('outStandingRptResult');
    },

    no(index){
        //console.log(index);
        return index + 1;
    }
});

//hook
AutoForm.hooks({
        outStandingRpt: {
            onSubmit(insertDoc, updateDoc, currentDoc){
                this.done(null, insertDoc);
            },
            onSuccess(formType, result){
                let query = result;
                let path = FlowRouter.path('outStandingRptGen', {}, query);

                window.open(path, '_blank');
            },
            onError(formType, error){
                alertify.error(error.message);
            }
        }
    }
);
