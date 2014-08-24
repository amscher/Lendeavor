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

LoanAspects.CreditValues = {
  VERY_POOR: 0,
  POOR: 1,
  GOOD: 2,
  STRONG: 3,
  ANY: 4
};

LoanAspects.CapitalValues = {
  SMALL: 0,
  MEDIUM: 1,
  LARGE: 2,
  ANY: 3
};

LoanAspects.TermsValues = {
  SHORT: 0,
  LONG: 1,
  ANY: 2
};

function LoanTypeData() {
  this.goalTypes = [
    "Community development",
    "Acquisition",
    "Startup",
    "Collateral",
    "Debt consolidation",
    "Expansion",
    "New equipment or reparations"
  ];

  this.loanTypes

  // If theres an 8th column, say w/ ...
  this.data =
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
};

LoanTypeData.prototype.processData = function() {
  var loanTypeStrings = this.data.trim().split(';');
  this.loanTypes = [];
  var self = this;
  loanTypeStrings.forEach(function(dataString) {
    var loanData = dataString.trim().split(',');
    var loanType = new LoanType();
    loanType.title = loanData[0];
    loanType.descripton = loanData[1];
    loanType.interestRateLow = parseInt(loanData[2]);
    loanType.interestRateHigh = parseInt(loanData[3]);
    loanType.personalGuarantee = loanData[4] == "yes" ? true : false;
    loanType.fundingTimeStart = parseInt(loanData[5]);
    loanType.fundingTimeEnd = parseInt(loanData[6]);

    // Deal with different aspects of who the loan is appropriate for...
    var aspectsData = loanData[7].trim().split('|');
    var loanAspects = new LoanAspects();
    // loanAspects.established =



    loanType.aspects = loanAspects;
    self.loanTypes.push(loanType);
  });
};


LoanTypeData.prototype.filterLoanTypes = function(type, aspect, loanTypes) {
  var filtered = [];
  loanTypes.forEach(function(type) {
    var match = false;
    switch(type) {
      case LoanAspects.ESTABLISHED:
        match = (type.aspects.established == aspect);
        break;
      case LoanAspects.CAPITAL:
        match = (type.aspects.capital == aspect);
        break;
      case LoanAspects.CREDIT:
        match = (type.aspects.credit == aspect);
        break;
      case LoanAspects.TERMS:
        match = (type.aspects.term == aspect);
        break;
      default:
        break;
    }
    //TODOOOOOOO!! Figure out how I want to check for an aspect?
    if (match) filtered.push(type);
  });
  return filtered;
};


window.onload = function() {
  var buttonEl = $(".small-capital-button");
  var tbodyEl = $(".loantypes-table-body");

  var data = new LoanTypeData();
  data.processData();

  var types = data.loanTypes;

  var makeTData = function(data) {
    return tdEl = $("<td>").text(data);
  };

  var displayLoans = function() {
    tbodyEl.empty();
    types.forEach(function(type) {
      var trEl = $("<tr>");
      trEl.append(makeTData(type.title));
      trEl.append(makeTData(type.descripton));
      trEl.append(makeTData(type.interestRateLow + " - " + type.interestRateHigh));
      trEl.append(makeTData(type.personalGuarantee));
      trEl.append(makeTData(type.fundingTimeStart + " - " + type.fundingTimeEnd));
      trEl.append(makeTData(type.aspects));
      tbodyEl.append(trEl);
    });
  };

  displayLoans();

  buttonEl.on("click", function(event) {
    types = data.filterLoanTypes(LoanAspects.CAPITAL, LoanAspects.CapitalValues.SMALL, types);
    displayLoans();
  });

};




