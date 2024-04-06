# LangChain.js MockLanguageModel

LangChain.js Mock Language Model is a package that provides a mock implementation of the `BaseLanguageModel` class from LangChain.js. It allows you to easily create mock language models for testing and development purposes.

## Installation

You can install the package using npm:

```shell
npm install langchainjs-mock-language-model
```

## Usage

To use the mock language model, you need to import the `MockLanguageModel` class from the package and create an instance of it with the desired mock functions.

```typescript
import { MockLanguageModel } from 'langchainjs-mock-language-model';

const mockModel = new MockLanguageModel<string>({
  invokeMock: async (input: BaseLanguageModelInput, options?: Partial<BaseLanguageModelCallOptions> | undefined) => {
    if (input === '1') {
      return 'Hello';
    } else if (input === '2') {
      return 'Nice to meet you';
    } else {
      return 'Unknown input';
    }
  },
});
```

In the above example, we create a `MockLanguageModel` instance with a custom `invokeMock` function. The `invokeMock` function defines the behavior of the `invoke` method, which takes an input and returns a mocked response based on the input value.

You can also provide mock functions for other methods like `generatePrompt`, `predict`, `predictMessages`, `_modelType`, and `_llmType`.

Once you have created the mock language model instance, you can use it in your tests or development code as follows:

```typescript
async function testMockModel() {
  const response1 = await mockModel.invoke('1');
  console.log(response1); // Output: 'Hello'

  const response2 = await mockModel.invoke('2');
  console.log(response2); // Output: 'Nice to meet you'

  const response3 = await mockModel.invoke('3');
  console.log(response3); // Output: 'Unknown input'
}
```

In this example, we call the `invoke` method of the mock language model with different inputs and log the responses.

## Configuration

The `MockLanguageModel` class accepts an object with optional mock functions for each method of the `BaseLanguageModel` class. You can provide custom implementations for these methods based on your testing or development requirements.

The available mock functions are:

- `generatePromptMock`: Mock function for the `generatePrompt` method.
- `predictMock`: Mock function for the `predict` method.
- `predictMessagesMock`: Mock function for the `predictMessages` method.
- `modelTypeMock`: Mock function for the `_modelType` method.
- `llmTypeMock`: Mock function for the `_llmType` method.
- `invokeMock`: Mock function for the `invoke` method.

If a mock function is not provided, the corresponding method will return a default value.

## Contributing

Contributions to the LangChain.js Mock Language Model package are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request on the [GitHub repository](https://github.com/O6lvl4/langchainjs-mock-language-model).

## License

This package is open-source and released under the [MIT License](https://opensource.org/licenses/MIT).
