import { loadFixture } from '../../../test/util';
import { extractPackageFile } from '.';

const invalidYAML = loadFixture('invalid.yml');
const matrixYAMLwithNodeSyntaxString = loadFixture('matrix_jobs.yml');
const matrixYAMLwithNodeSyntaxArray = loadFixture('matrix_jobs_array.yml');
const matrixYAMLwithNodeSyntaxArray2 = loadFixture('matrix_jobs_array2.yml');
const matrixYAMLwithNodeSyntaxAlias = loadFixture('matrix_alias.yml');
const invalidMatrixYAML = loadFixture('matrix_invalid.yml');

describe('manager/travis/extract', () => {
  describe('extractPackageFile()', () => {
    it('returns empty if fails to parse', () => {
      const res = extractPackageFile('blahhhhh:foo:@what\n');
      expect(res).toBeNull();
    });

    it('returns results', () => {
      const res = extractPackageFile('node_js:\n  - 6\n  - 8\n');
      expect(res).toMatchSnapshot();
      expect(res.deps).toHaveLength(2);
    });

    it('should handle invalid YAML', () => {
      const res = extractPackageFile(invalidYAML);
      expect(res).toBeNull();
    });

    it('handles matrix node_js syntax with node_js string', () => {
      const res = extractPackageFile(matrixYAMLwithNodeSyntaxString);
      expect(res).toEqual({
        deps: [
          {
            currentValue: '11.10.1',
            datasource: 'github-tags',
            depName: 'node',
            lookupName: 'nodejs/node',
          },
        ],
      });
    });

    it('handles matrix node_js syntax with node_js array', () => {
      const res = extractPackageFile(matrixYAMLwithNodeSyntaxArray);
      expect(res).toEqual({
        deps: [
          {
            currentValue: '11.10.1',
            datasource: 'github-tags',
            depName: 'node',
            lookupName: 'nodejs/node',
          },
          {
            currentValue: '11.10.2',
            datasource: 'github-tags',
            depName: 'node',
            lookupName: 'nodejs/node',
          },
        ],
      });
    });

    it('handles matrix node_js syntax with node_js array 2', () => {
      const res = extractPackageFile(matrixYAMLwithNodeSyntaxArray2);
      expect(res).toEqual({
        deps: [
          {
            currentValue: '11.10.1',
            datasource: 'github-tags',
            depName: 'node',
            lookupName: 'nodejs/node',
          },
          {
            currentValue: '11.10.2',
            datasource: 'github-tags',
            depName: 'node',
            lookupName: 'nodejs/node',
          },
        ],
      });
    });

    it('handles matrix node_js syntax with alias', () => {
      const res = extractPackageFile(matrixYAMLwithNodeSyntaxAlias);
      expect(res).toEqual({
        deps: [
          {
            currentValue: '11.10.1',
            datasource: 'github-tags',
            depName: 'node',
            lookupName: 'nodejs/node',
          },
        ],
      });
    });

    it('handles invalid matrix node_js syntax', () => {
      const res = extractPackageFile(invalidMatrixYAML);
      expect(res).toBeNull();
    });
  });
});
