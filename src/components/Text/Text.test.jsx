import { render, screen } from '@testing-library/react';

import { Text } from './Text';

const text = 'Some text';

describe('Text', () => {
  it('should render with children', () => {
    render(<Text>{text}</Text>);
    expect(screen.getByText(text)).toBeInTheDocument();
  });
  it('should render with classNames', () => {
    const className = 'test';
    render(<Text className={className}>{text}</Text>);

    const element = screen.getByText(text);

    expect(element).toBeInTheDocument();
    expect(element).toHaveClass(className);
    expect(element).toHaveClass('text');
  });
  it('should added styles for isError and isSuccess', () => {
    render(
      <Text isError isSuccess>
        {text}
      </Text>,
    );

    const element = screen.getByText(text);

    expect(element).toBeInTheDocument();
    expect(element).toHaveClass('error');
    expect(element).toHaveClass('success');
  });
});
