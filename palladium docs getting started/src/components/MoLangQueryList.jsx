import React, {useState} from 'react';
import CodeInline from '@theme/CodeInline';
import {Table, TableBody, TableCell, TableHead, TableRow, TextField} from "@mui/material";
import MuiThemeProvider from "./MuiThemeProvider";

function signature(query) {
    const args = query.arguments || [];
    return args.length > 0 ? `${query.name}(${args.map(a => a.key).join(', ')})` : query.name;
}

export default function MoLangQueryList({data}) {
    const [filter, setFilter] = useState('');
    const search = filter.trim().toLowerCase();
    const queries = [...data]
        .sort((a, b) => a.name.localeCompare(b.name))
        .filter(q => search === '' || q.name.toLowerCase().includes(search) || q.description.toLowerCase().includes(search));

    return (
        <MuiThemeProvider>
            <TextField size="small" fullWidth placeholder="Filter queries" value={filter}
                       onChange={e => setFilter(e.target.value)} style={{marginBottom: '12px'}}/>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Query</TableCell>
                        <TableCell>Returns</TableCell>
                        <TableCell>Description</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {queries.map(query =>
                        <TableRow key={query.name} id={query.name}>
                            <TableCell style={{whiteSpace: 'nowrap'}}><CodeInline>{signature(query)}</CodeInline></TableCell>
                            <TableCell>{query.returns}</TableCell>
                            <TableCell>
                                <div dangerouslySetInnerHTML={{__html: query.description}}/>
                                {(query.arguments || []).length > 0 &&
                                    <ul style={{marginTop: '6px', marginBottom: 0}}>
                                        {query.arguments.map(arg =>
                                            <li key={arg.key}><CodeInline>{arg.key}</CodeInline> ({arg.type}): {arg.description}</li>
                                        )}
                                    </ul>
                                }
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </MuiThemeProvider>
    );
}
