import { render } from '@react-email/components';
import * as React from 'react';
import { TEMPLATES } from '../src/lib/email-templates/registry.ts';

const template = TEMPLATES['retreat-announcement'];
const element = React.createElement(template.component, template.previewData || {});
const html = await render(element);
console.log(html);
