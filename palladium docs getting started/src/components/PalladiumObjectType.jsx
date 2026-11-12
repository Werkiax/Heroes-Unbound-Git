import React from 'react';
import CodeInline from '@theme/CodeInline';
import { Tooltip } from "@mui/material";

export default function PalladiumObjectType({ type }) {
    const typeOf = typeof type;

    return (<>
        {
            typeOf === 'string' && type
        }

        {
            typeOf === 'object' && type.type === 'enum' &&
            type.values.map((v, i) => <React.Fragment key={i}><CodeInline>{v}</CodeInline><br /></React.Fragment>)
        }

        {
            typeOf === 'object' && type.type === 'combined' &&
            type.options.map((v, i) => <React.Fragment key={i}><PalladiumObjectType type={v} />{i < type.options.length - 1 ? ', ' : ''}<br /></React.Fragment>)
        }

        {
            typeOf === 'object' && type.type === 'tooltip' &&
            <Tooltip title={type.tooltip}>
                <span style={{ textDecoration: 'underline', textDecorationStyle: 'dotted' }}>{type.name}</span>
            </Tooltip>
        }
    </>
    );
}