FlowRouter.route('/outStandingRpt', {
    name: "outStandingRpt",
    action: function (params, queryParams) {
        BlazeLayout.render('mainLayout', {content: "outStandingRpt"});
    },
    breadcrumb: {
        title: "OutStanding",
        parent: "home"
    }
});

FlowRouter.route('/outStandingRptGen', {
    name: "outStandingRptGen",
    action: function (params, queryParams) {
        BlazeLayout.render('reportLayout', {content: "outStandingRptGen"});
    }
});
