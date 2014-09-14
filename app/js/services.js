'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', []).
  value('version', '0.1').
  service('LoanTypes', ['LoanType', 'LoanAspects', function(LoanType, LoanAspects) {
    var data =
      // "title, descripton, interest-rate-low, interest-rate-high, personal-garauntee, funding-time-start, funding-time-end, appropiate-for established | credit | goal | capital-needs | terms | business-type | collateral;" +
      "Bank Term Loan, Traditional bank term loan, 4, 8, yes, 30, , 3+ years||strong|large|long|cash-based|yes;" +
      "Bank Line of Credit, Revolving line of credit from a traditional bank, 5, 9, yes, 15, 30, 3+ years|strong|||short|||;" +
      "Bank SBA Loan, Government-guaranteed term loan, 5, 7, yes, 45, , |strong|expansion or acquisition||long|startup|yes;" +
      "Non-bank SBA Loan, Government-guaranteed term loan with less stringent requirements often made by non-profit or mission-focused lenders, 6, 9, yes, 45, 60, |good|acquisition|medium||community-focus|yes;" +
      "Non-Bank Long Term Business Loan, Term loan with higher interest rate than a traditional bank\'s with terms ranging from 3-5 years, 8, 20, yes, 1, 10, 2+ years|good|||long|cash-based||strong revenue and income;" +
      "Non-Bank Short Term Business Loan, Term loan with higher interest rate than a traditional bank\'s with terms ranging from 6 months to 2 years, 12, 40, yes, 1, 10, |poor|||short|cash-based||strong revenues;" +
      "SBA Community Advantage Loan, A traditional term loan for businesses with a medium sized capital need that falls short of bank requirements, 6, 8, yes, 30, , |good|community development|medium|||yes;" +
      "SBA Microloan, A traditional term loan for businesses with small capital needs that fall short of bank requirements, 7, 10, yes, 30, , |||small||veteran and women or minority-owned and green businesses|;" +
      "Peer to Peer Loan, Peer to peer platforms connect borrowers with groups of individual lenders and institutional investors, 8, 25, yes, 10, 20, young|strong||small|||;" +
      "Equipment Finance, Financing for equipment purchases and refurbishment, 5, 25, no, 2, 20, ||buying or repairing new equipment||||;" +
      "Invoice Factoring, An advance based on wholesale invoice, 8, 25, yes, 1, 14, not startups||wholesale invoices|||business-to-business|;" +
      "Business Microloan, A small term loan of 50K or less, 12, 25, yes, 14, 28, |poor||small||sole prorietor or home businesses||low revenue;" +
      "Merchant Cash Advance, An advance of money to a business which is repaid via daily deductions from credit card reciepts, 30, 80, no, 1, 5, |poor||||not cash-based or startups|;" +
      "Crowdfunding, Individuals donate money to businesses or projects they want to see in action, , , no, , , ||startup concepts||||"

    return function() {
      var goalTypes = [
        "Community development",
        "Acquisition",
        "Startup",
        "Collateral",
        "Debt consolidation",
        "Expansion",
        "New equipment or reparations"
      ];
        // If theres an 8th column, say w/ ...
      var loanTypeStrings = data.trim().split(';');
      var loanTypes = [];
      loanTypeStrings.forEach(function(dataString) {
        var loanData = dataString.trim().split(',');
        var loanType = new LoanType();
        loanType.title = loanData[0].trim();
        loanType.description = loanData[1].trim();
        loanType.interestRateLow = parseInt(loanData[2].trim());
        loanType.interestRateHigh = parseInt(loanData[3].trim());
        loanType.personalGuarantee = loanData[4].trim() == "yes" ? true : false;
        loanType.fundingTimeStart = parseInt(loanData[5]);
        loanType.fundingTimeEnd = parseInt(loanData[6]);

        // Deal with different aspects of who the loan is appropriate for...
        var aspectsData = loanData[7].trim().split('|');
        var loanAspects = new LoanAspects();
        loanAspects.established = aspectsData[0].trim();
        loanAspects.credit = aspectsData[1].trim();
        loanAspects.goal = aspectsData[2].trim();
        loanAspects.capitalNeedsSize = aspectsData[3].trim();
        loanAspects.term = aspectsData[4].trim();
        loanAspects.businessType = aspectsData[5].trim();
        loanAspects.collateral = aspectsData[6].trim();
        if (aspectsData.length > 7) {
          loanAspects.extra = aspectsData[7].trim();
        }

        loanType.aspects = loanAspects;
        loanTypes.push(loanType);
      });
      return loanTypes;
    }
  }]);