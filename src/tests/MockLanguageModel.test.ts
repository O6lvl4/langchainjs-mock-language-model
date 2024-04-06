import { test, expect } from '@jest/globals';
import { MockLanguageModel } from '../MockLanguageModel';

test('MockLanguageModel', () => {
  const model = new MockLanguageModel({
    generatePromptMock: async () => ({ completion: 'mock', generations: [] }),
    predictMock: async () => 'mock',
    modelTypeMock: () => 'mock',
    llmTypeMock: () => 'mock',
    invokeMock: async () => 'mock',
  });

  expect(model._modelType()).toBe('mock');
  expect(model._llmType()).toBe('mock');
  expect(model.lc_namespace).toEqual([]);
  expect(model.invoke('')).resolves.toBe('mock');
});
