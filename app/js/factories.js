'use strict';

/* Factories */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.factories', []).
  factory('LoanType', function() {
    function LoanType() {
      this.title;
      this.description;

      /** @type {number} in percent */
      this.interestRateLow;

      /** @type {number} in percent */
      this.interestRateHigh;

      /** @type {boolean} */
      this.personalGuarantee;

      /** @type {number} in days */
      this.fundingTimeStart;

      /** @type {number} */
      this.fundingTimeEnd;

      /** @type {LoanAspects} */
      this.aspects;
    };

    return LoanType;
  }).
  factory('LoanAspects', function() {
    function LoanAspects() {
      this.established;
      this.credit;
      this.terms;
      this.capitalNeedsSize;

      this.goal;
      this.businessType;
      this.collateral;
      this.extra;
    };

    LoanAspects.ESTABLISHED = "established";
    LoanAspects.CREDIT = "credit";
    LoanAspects.CAPITAL = "capital";
    LoanAspects.TERMS = "terms";

    LoanAspects.EstablishedTime = {
      YOUNG: 0,
      TWOYR: 1,
      THREEYR: 2,
      ESTABLISHED: 4,
      ANY: 5
    };

    LoanAspects.CreditValues = [
      {rank: 0, name: "very poor"},
      {rank: 1, name: "poor"},
      {rank: 2, name: "good"},
      {rank: 3, name: "strong"},
      {rank: 4, name: "I don't know"}
    ];

    LoanAspects.CapitalValues = [
      {rank: 0, name: "small"},
      {rank: 1, name: "medium"},
      {rank: 2, name: "large"},
      {rank: 3, name: "I don't know"}
    ];

    LoanAspects.TermsValues = [
      {rank: 0, name: "short"},
      {rank: 1, name: "long"},
      {rank: 2, name: "I don't know"}
    ];

    return LoanAspects;
  });
