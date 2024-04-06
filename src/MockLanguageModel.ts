import {
  BaseLanguageModel,
  BaseLanguageModelCallOptions,
  BaseLanguageModelInput,
} from '@langchain/core/language_models/base';
import { BasePromptValue } from '@langchain/core/prompt_values';
import { Callbacks } from '@langchain/core/callbacks/manager';
import { LLMResult } from '@langchain/core/outputs';
import { AIMessage, BaseMessage } from '@langchain/core/messages';

export class MockLanguageModel<T> extends BaseLanguageModel<T> {
  lc_namespace: string[] = [];

  _modelType(): string {
    // console.log('_modelType');
    return this.modelTypeMock?.() ?? 'mock';
  }

  _llmType(): string {
    // console.log('_llmType');
    return this.llmTypeMock?.() ?? 'mock';
  }

  private generatePromptMock?: (
    promptValues: BasePromptValue[],
    options?: BaseLanguageModelCallOptions | string[] | undefined,
    callbacks?: Callbacks | undefined,
  ) => Promise<LLMResult>;

  private predictMock?: (
    text: string,
    options?: BaseLanguageModelCallOptions | string[] | undefined,
    callbacks?: Callbacks | undefined,
  ) => Promise<string>;

  private predictMessagesMock?: (
    messages: BaseMessage[],
    options?: BaseLanguageModelCallOptions | string[] | undefined,
    callbacks?: Callbacks | undefined,
  ) => Promise<BaseMessage>;

  private modelTypeMock?: () => string;
  private llmTypeMock?: () => string;

  private invokeMock?: (
    input: BaseLanguageModelInput,
    options?: Partial<BaseLanguageModelCallOptions> | undefined,
  ) => Promise<T>;

  private constructor(parameters: {
    generatePromptMock?: (
      promptValues: BasePromptValue[],
      options?: BaseLanguageModelCallOptions | string[] | undefined,
      callbacks?: Callbacks | undefined,
    ) => Promise<LLMResult>;
    predictMock?: (
      text: string,
      options?: BaseLanguageModelCallOptions | string[] | undefined,
      callbacks?: Callbacks | undefined,
    ) => Promise<string>;
    predictMessagesMock?: (
      messages: BaseMessage[],
      options?: BaseLanguageModelCallOptions | string[] | undefined,
      callbacks?: Callbacks | undefined,
    ) => Promise<BaseMessage>;
    modelTypeMock?: () => string;
    llmTypeMock?: () => string;
    invokeMock?: (
      input: BaseLanguageModelInput,
      options?: Partial<BaseLanguageModelCallOptions> | undefined,
    ) => Promise<T>;
  }) {
    super({}); // Pass an empty object as the argument to the super() call
    this.generatePromptMock = parameters.generatePromptMock;
    this.predictMock = parameters.predictMock;
    this.predictMessagesMock = parameters.predictMessagesMock;
    this.modelTypeMock = parameters.modelTypeMock;
    this.llmTypeMock = parameters.llmTypeMock;
    this.invokeMock = parameters.invokeMock;
  }

  public static from<T>(parameters: {
    generatePromptMock?: (
      promptValues: BasePromptValue[],
      options?: BaseLanguageModelCallOptions | string[] | undefined,
      callbacks?: Callbacks | undefined,
    ) => Promise<LLMResult>;
    predictMock?: (
      text: string,
      options?: BaseLanguageModelCallOptions | string[] | undefined,
      callbacks?: Callbacks | undefined,
    ) => Promise<string>;
    predictMessagesMock?: (
      messages: BaseMessage[],
      options?: BaseLanguageModelCallOptions | string[] | undefined,
      callbacks?: Callbacks | undefined,
    ) => Promise<BaseMessage>;
    modelTypeMock?: () => string;
    llmTypeMock?: () => string;
    invokeMock?: (
      input: BaseLanguageModelInput,
      options?: Partial<BaseLanguageModelCallOptions> | undefined,
    ) => Promise<T>;
  }): MockLanguageModel<T> {
    return new MockLanguageModel<T>(parameters);
  }

  async generatePrompt(
    promptValues: BasePromptValue[],
    options?: BaseLanguageModelCallOptions | string[] | undefined,
    callbacks?: Callbacks | undefined,
  ): Promise<LLMResult> {
    // console.log('generatePrompt parameters: ', promptValues, options, callbacks);
    return this.generatePromptMock?.(promptValues, options, callbacks) ?? { generations: [[]] };
  }

  async predict(
    text: string,
    options?: BaseLanguageModelCallOptions | string[] | undefined,
    callbacks?: Callbacks | undefined,
  ): Promise<string> {
    // console.log('predict parameters: ', text, options, callbacks);
    return this.predictMock?.(text, options, callbacks) ?? '';
  }

  async predictMessages(
    messages: BaseMessage[],
    options?: BaseLanguageModelCallOptions | string[] | undefined,
    callbacks?: Callbacks | undefined,
  ): Promise<BaseMessage> {
    // console.log('predictMessages parameters: ', messages, options, callbacks);
    return this.predictMessagesMock?.(messages, options, callbacks) ?? new AIMessage('');
  }

  async invoke(input: BaseLanguageModelInput, options?: Partial<BaseLanguageModelCallOptions> | undefined): Promise<T> {
    // console.log('invoke parameters: ', input, options);
    if (this.invokeMock) {
      return this.invokeMock(input, options);
    }
    throw new Error('invokeMock is not defined.');
  }
}
