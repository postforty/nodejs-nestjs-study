/* eslint-disable prettier/prettier */
import common from './common';
import local from './local';
import dev from './dev';
import prod from './prod';
import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';

const phase = process.env.NODE_ENV.trim();
console.log('1:', phase, phase.length);

let conf = {};
if (phase === 'local') {
  conf = local;
} else if (phase === 'dev') {
  console.log('2:', phase, phase.length);
  conf = dev;
  console.log('3:', conf);
} else if (phase === 'prod') {
  conf = prod;
}

const yamlConfig: Record<string, any> = yaml.load(
  readFileSync(`${process.cwd()}/envs/config.yaml`, 'utf8'),
);

export default () => ({ ...common, ...conf, ...yamlConfig });
