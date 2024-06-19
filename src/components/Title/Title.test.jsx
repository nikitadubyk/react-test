import { render, screen } from '@testing-library/react';

import { Title } from './Title';

const text = 'Hello World!';

describe('Title', () => {
  it('should render title with children', () => {
    render(<Title>{text}</Title>);

    expect(screen.getByText(text)).toBeInTheDocument();
  });
  it('should render title with current h tag', () => {
    const { container } = render(<Title level={2}>{text}</Title>);

    expect(container.querySelector('h2')).toBeInTheDocument();
  });
  it('should render title with correct classNames', () => {
    render(<Title className="test">{text}</Title>);

    const element = screen.getByText(text);

    expect(element).toBeInTheDocument();
    expect(element).toHaveClass('test');
    expect(element).toHaveClass('title');
  });
});
