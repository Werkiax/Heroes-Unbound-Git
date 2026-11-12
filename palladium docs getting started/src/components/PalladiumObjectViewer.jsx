import React, {useState} from 'react';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CodeBlock from '@theme/CodeBlock';
import CodeInline from '@theme/CodeInline';
import {
    Checkbox,
    FormControlLabel,
    FormGroup,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Tooltip
} from "@mui/material";
import {Check, Close} from "@mui/icons-material";
import PalladiumObjectType from "./PalladiumObjectType";
import MuiThemeProvider from "./MuiThemeProvider";

export default function PalladiumObjectViewer({ data, heading = 'h2', showFullPowerExamples = false }) {
    const [showAsPower, setShowAsPower] = useState(false);
    const [copied, setCopied] = useState(false);

    const examples = data.examples || data.example || [];
    const fullId = `${data.namespace}:${data.path}`;

    const handleCopy = () => {
        navigator.clipboard.writeText(fullId);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <MuiThemeProvider>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
                <div>
                    <strong>ID:</strong>{' '}
                    <Tooltip title={copied ? "Copied!" : "Copy ID"} placement="top">
                        <span
                            onClick={handleCopy}
                            style={{ cursor: 'pointer' }}
                        >
                            <CodeInline>{fullId}</CodeInline>
                        </span>
                    </Tooltip>
                </div>
                <div dangerouslySetInnerHTML={{ __html: data.description }} />
            </div>

            {(data.fields?.length > 0 || examples.length > 0) &&
                <Tabs>
                    {data.fields?.length > 0 &&
                        <TabItem value="settings" label="Settings" default>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Key</TableCell>
                                        <TableCell>Type</TableCell>
                                        <TableCell>Description</TableCell>
                                        <TableCell align="right">Required</TableCell>
                                        <TableCell align="right">Fallback</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        data.fields.map((field) =>
                                            <TableRow key={field.key}>
                                                <TableCell><CodeInline>{field.key}</CodeInline></TableCell>
                                                <TableCell><PalladiumObjectType type={field.type} /></TableCell>
                                                <TableCell dangerouslySetInnerHTML={{ __html: field.description }} />
                                                <TableCell align="center">{field.required ? <Check color={'success'} /> :
                                                    <Close color={'error'} />}</TableCell>
                                                <TableCell
                                                    align="right">{field.fallback != null ? String(field.fallback) : '/'}</TableCell>
                                            </TableRow>
                                        )
                                    }
                                </TableBody>
                            </Table>
                        </TabItem>
                    }

                    {examples.map((example, index) => {
                        let powerExample = {
                            name: "Example Power",
                            icon: "minecraft:command_block",
                            abilities: {}
                        };
                        powerExample.abilities[data.path] = example;

                        return (
                            <TabItem value={`example-${index}`}
                                label={examples.length > 1 ? `Example ${index + 1}` : "Example"}
                                key={`example-${index}`}>
                                {showFullPowerExamples &&
                                    <FormGroup>
                                        <FormControlLabel control={<Checkbox checked={showAsPower}
                                            onChange={(e) => setShowAsPower(e.target.checked)} />}
                                            label="Show in full power" />
                                    </FormGroup>
                                }

                                <CodeBlock language="json" showLineNumbers>
                                    {JSON.stringify(showAsPower ? powerExample : example, null, 2)}
                                </CodeBlock>
                            </TabItem>
                        );
                    })}
                </Tabs>
            }
        </MuiThemeProvider>
    );
}