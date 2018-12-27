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
import DeleteConfirmationModal, {
  DeleteConfirmationAlert,
} from "./DeleteRuleModal";
import CreateRuleModal, { CreateConfirmationModal } from "./CreateRuleModal";
import { WriteSelectors } from "./selectors";

const RuleListContainer = ({ rules, handleActionOpen }) => (
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
          handleActionOpen={handleActionOpen}
          key={rule.id}
          rule={rule}
        />
      ))}
    </TableBody>
  </Table>
);

const BounceRuleMin = ({ rule, handleActionOpen }) => {
  const {
    id,
    bounce_action: bounceAction,
    response_code: responseCode,
    description,
  } = rule;
  return (
    <TableRow data-cypress={bounceAction}>
      <TableCell>{id}</TableCell>
      <TableCell>{bounceAction}</TableCell>
      <TableCell>{responseCode}</TableCell>
      <TableCell>{description}</TableCell>
      <ActionsCell>
        <Action
          title="View"
          onClick={handleActionOpen}
          id="isRedirectingToDetail"
          rule={id}
          icon="view"
        />
        <Action title="Edit" icon="pencil" />
        <Action
          title="Delete"
          onClick={handleActionOpen}
          rule={id}
          data-rule={id}
          // data-rule={bounceAction}
          id="isDeleteConfirmationOpen"
          icon="trash"
        />
      </ActionsCell>
    </TableRow>
  );
};

const BounceRulesContainer = ({
  rules,
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
  isCreateRuleOpen,
  handleRuleUpdate,
  handleCreateSubmit,
  isCreateRuleConfirmationOpen,
  handleCreateConfirm,
  newRule,
  isInvalidInput,
  isDeleteConfirmationOpen,
  isDeleteAlertOpen,
  idToDelete,
  handleDeleteConfirm,
  handleModalClose,
  handleCreateOpen,
  handleActionOpen,
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
      <Column className=" csv-button-col" width={4} offset={8}>
        <CSVLink
          {...WriteSelectors.csvButton}
          filename="bounce_rules.csv"
          className="sg-button btn btn-secondary sg-right"
          data={rules}
        >
          Export CSV
        </CSVLink>
        <Button
          {...WriteSelectors.createRuleButton}
          onClick={handleCreateOpen}
          onKeyDown={handleCreateOpen}
          id="isCreateRuleOpen"
          data-button="create-button"
          className="create-rule-button"
          type="primary"
        >
          Create Rule
        </Button>
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
            handleActionOpen={handleActionOpen}
            selectedRule={selectedRule}
            rules={filteredRules}
          />
        </div>
      </Column>
    </Row>
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
    {isCreateRuleOpen && (
      <CreateRuleModal
        {...WriteSelectors.createRuleModal}
        newRule={newRule}
        isInvalidInput={isInvalidInput}
        handleModalClose={handleModalClose}
        handleRuleUpdate={handleRuleUpdate}
        handleCreateSubmit={handleCreateSubmit}
      />
    )}
    {isCreateRuleConfirmationOpen && (
      <CreateConfirmationModal
        {...WriteSelectors.confirmModal}
        handleModalClose={handleModalClose}
        handleCreateConfirm={handleCreateConfirm}
      />
    )}
    {isDeleteConfirmationOpen && (
      <DeleteConfirmationModal
        idToDelete={idToDelete}
        handleModalClose={handleModalClose}
        handleDeleteConfirm={handleDeleteConfirm}
      />
    )}
    {isDeleteAlertOpen && (
      <DeleteConfirmationAlert handleModalClose={handleModalClose} />
    )}
  </div>
);

export default BounceRulesContainer;
export { RuleListContainer, BounceRuleMin };
