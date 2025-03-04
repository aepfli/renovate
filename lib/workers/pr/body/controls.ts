import { emojify } from '../../../util/emoji';
import { isBranchModified } from '../../../util/git';
import type { BranchConfig } from '../../types';

export async function getControls(config: BranchConfig): Promise<string> {
  const warning = (await isBranchModified(config.branchName))
    ? emojify(' :warning: **Warning**: custom changes will be lost.')
    : '';
  return `\n\n---\n\n - [ ] <!-- rebase-check -->If you want to rebase/retry this PR, click this checkbox.${warning}\n\n`;
}
