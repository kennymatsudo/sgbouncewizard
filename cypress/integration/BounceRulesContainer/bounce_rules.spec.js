import BounceRulesPage from "../../Pages/BounceRulesContainer";

const testDeleteRule = {
  priority: 1,
  bounce_action: "cypressDeleteTest",
  response_code: 528,
  description: "testDescription",
  enhanced_code: "492",
  regex: "testRegex",
};

const testCreateRule = {
  priority: 2,
  bounce_action: "cypressCreateTest",
  response_code: 918,
  description: "testDescription",
  enhanced_code: "492",
  regex: "testRegex",
};

describe("Bounce Rules Page", () => {
  beforeEach(() => {
    cy.login("hadarziv@sg.com", "papa");
    BounceRulesPage.open();
  });

  it("should pass healthchecks", () => {
    BounceRulesPage.page.should("be.visible");
    BounceRulesPage.breadcrumb.should("be.visible");
    BounceRulesPage.csvButton.should("be.visible");
    BounceRulesPage.createRuleButton.should("be.visible");
    BounceRulesPage.ruleFilter.should("be.visible");
    BounceRulesPage.ruleTable.should("be.visible");
  });

  it("should create a bounce rule", () => {
    BounceRulesPage.deleteBounceRuleAPI(testCreateRule).then(() => {
      BounceRulesPage.createBounceRuleUI(testCreateRule);
      BounceRulesPage.testBounceRuleToCreate.should("be.visible");
    });
  });

  it("should delete a bounce rule", () => {
    BounceRulesPage.createBounceRuleAPI(testDeleteRule).then(res => {
      BounceRulesPage.deleteBounceRuleUI(res.id);
      BounceRulesPage.testBounceRuleToDelete.should("not.be.visible");
    });
  });
});
