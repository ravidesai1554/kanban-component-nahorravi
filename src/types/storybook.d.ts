// Added to augment Storybook types so `autodocs` is accepted in .storybook/main.ts
declare module '@storybook/types' {
  interface StorybookConfig {
    // allow the autodocs flag used in this repo
    autodocs?: 'tag' | boolean | string;
  }
}
