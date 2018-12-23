import React from "react";
import { CSVLink } from "react-csv";
import "./index.scss";
import { Button } from "@sendgrid/ui-components/button";
import Breadcrumb from "@sendgrid/ui-components/breadcrumb";
import { Action, ActionsCell } from "@sendgrid/ui-components/actions";
import {
  HeaderCell,
  TableCell,
  Table,
  TableBody,
  TableHeader,
  TableRow,
} from "@sendgrid/ui-components/table/table";
import Header from "../Header";
import { Row } from "../Row";
import { Column } from "../Column";
import RuleFilter from "./RuleFilter";
import Pagination from "../Pagination";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import DeleteConfirmationAlert from "./DeleteConfirmationAlert";
import { WriteSelectors } from "./selectors";

const RuleListContainer = ({
  rules,
  handleKeyDown,
  handleRuleClick,
  handleDeleteRuleClicked,
}) => (
  <Table>
    <TableHeader>
      <TableRow>
        <HeaderCell>Id</HeaderCell>
        <HeaderCell>Bounce Action</HeaderCell>
        <HeaderCell>Response Code</HeaderCell>
        <HeaderCell>Description</HeaderCell>
        <HeaderCell className="actions-cell">Actions</HeaderCell>
      </TableRow>
    </TableHeader>
    <TableBody>
      {rules.map(rule => (
        <BounceRuleMin
          handleKeyDown={handleKeyDown}
          handleRuleClick={handleRuleClick}
          handleDeleteRuleClicked={handleDeleteRuleClicked}
          key={rule.id}
          rule={rule}
        />
      ))}
    </TableBody>
  </Table>
);

const BounceRuleMin = ({ rule, handleRuleClick, handleDeleteRuleClicked }) => {
  const {
    id,
    bounce_action: bounceAction,
    response_code: responseCode,
    description,
  } = rule;
  return (
    <TableRow>
      <TableCell>{id}</TableCell>
      <TableCell>{bounceAction}</TableCell>
      <TableCell>{responseCode}</TableCell>
      <TableCell>{description}</TableCell>
      <ActionsCell>
        <Action
          title="View"
          onClick={() => handleRuleClick(rule)}
          icon="view"
        />
        <Action title="Edit" icon="pencil" />
        <Action
          title="Delete"
          onClick={handleDeleteRuleClicked}
          id={id}
          icon="trash"
        />
      </ActionsCell>
    </TableRow>
  );
};

const BounceRulesContainer = ({
  rules,
  handleRuleClick,
  handleKeyDown,
  handleDeleteRuleClicked,
  updateSearchToken,
  updateSearchCategory,
  removeFilter,
  prevPageIndex,
  nextPageIndex,
  updatePageIndex,
  filteredRules,
  searchToken,
  selectedRule,
  pageIndex,
  pageInterval,
  pagesToDisplay,
  numRules,
  filterOptions,
  addFilter,
  invalidFilter,
  isDeleteConfirmationOpen,
  handleDeleteRuleConfirm,
  idToDelete,
  handleConfirmClose,
  isDeleteAlertOpen,
  handleAlertClose,
}) => (
  <div {...WriteSelectors.page} className="container">
    <Header name="Kenny" />
    <Row>
      <Column width={6} offset={2}>
        <Breadcrumb>
          <a {...WriteSelectors.breadcrumb} href="/bounce_rules">
            Bounce Rules
          </a>
        </Breadcrumb>
      </Column>
    </Row>
    <Row>
      <Column width={2} offset={2}>
        <h1>Bounce Rules</h1>
      </Column>
      <Column className=" csv-button-col" width={1} offset={10}>
        <CSVLink
          {...WriteSelectors.csvButton}
          filename="bounce_rules.csv"
          className="sg-button btn btn-secondary"
          data={rules}
        >
          Export CSV
        </CSVLink>
      </Column>
      <Column width={1} offset={11}>
        <div style={{ textAlign: "left" }}>
          <Button
            {...WriteSelectors.createRuleButton}
            className="create-rule-button"
            type="primary"
          >
            Create Rule
          </Button>
        </div>
      </Column>
    </Row>
    <Row>
      <Column width={10} offset={2}>
        <div {...WriteSelectors.ruleFilter}>
          <RuleFilter
            searchToken={searchToken}
            updateSearchToken={updateSearchToken}
            updateSearchCategory={updateSearchCategory}
            filterOptions={filterOptions}
            addFilter={addFilter}
            removeFilter={removeFilter}
            invalidFilter={invalidFilter}
          />
        </div>
      </Column>
    </Row>
    <Row>
      <Column width={10} offset={2}>
        <div {...WriteSelectors.ruleTable}>
          <RuleListContainer
            handleRuleClick={handleRuleClick}
            handleKeyDown={handleKeyDown}
            handleDeleteRuleClicked={handleDeleteRuleClicked}
            selectedRule={selectedRule}
            rules={filteredRules}
          />
        </div>
      </Column>
    </Row>
    {numRules > pageInterval && (
      <Row>
        <Column width={4} offset={5}>
          <Pagination
            prevPageIndex={prevPageIndex}
            nextPageIndex={nextPageIndex}
            pageIndex={pageIndex}
            pageInterval={pageInterval}
            numRules={numRules}
            updatePageIndex={updatePageIndex}
            pagesToDisplay={pagesToDisplay}
          />
        </Column>
      </Row>
    )}
    {isDeleteConfirmationOpen && (
      <DeleteConfirmationModal
        idToDelete={idToDelete}
        handleConfirmClose={handleConfirmClose}
        handleDeleteRuleConfirm={handleDeleteRuleConfirm}
      />
    )}
    {isDeleteAlertOpen && (
      <DeleteConfirmationAlert handleAlertClose={handleAlertClose} />
    )}
  </div>
);

export default BounceRulesContainer;
export { RuleListContainer, BounceRuleMin };
