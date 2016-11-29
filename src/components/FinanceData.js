import React, { Component } from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

export class FinanceData extends Component {
    render() {
        return (
            <Table height={ '400px' }>
              <TableHeader displaySelectAll={ false } adjustForCheckbox={ false }>
                <TableRow>
                  <TableHeaderColumn>Year</TableHeaderColumn>
                  <TableHeaderColumn>Avg. GDP in Billions</TableHeaderColumn>
                  <TableHeaderColumn></TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody displayRowCheckbox={ false }>
              { this.props.financeData.map(datum => {
                  let style = {
                      backgroundColor: +datum.year > 2016 ? '#f19c93' : '#fff',
                      color: +datum.year > 2016 ? '#fff' : '#000',
                  }

                  return (
                      <TableRow key={ datum.year } style={ style }>
                        <TableRowColumn>{ datum.year }</TableRowColumn>
                        <TableRowColumn>{ datum.gdp + ' billion' }</TableRowColumn>
                        <TableRowColumn>{ +datum.year > 2016 ? 'Projection' : '' }</TableRowColumn>
                      </TableRow>
                  )
              })}
              </TableBody>
            </Table>
        )
    }
}
