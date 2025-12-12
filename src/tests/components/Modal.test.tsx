// Modal.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Modal from '@/components/Modal';

describe('Modal', () => {
  const defaultProps = {
    open: true,
    onCloseModal: jest.fn(),
    onConfirmModal: jest.fn(),
    title: 'Test Title',
    text: 'Test message text',
    approveBtn: 'Confirm',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders modal content when open is true', () => {
    render(<Modal {...defaultProps} />);

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test message text')).toBeInTheDocument();
    expect(screen.getByText('Confirm')).toBeInTheDocument();
    expect(screen.getByText('Отмена')).toBeInTheDocument();
  });

  it('does not render modal content when open is false', () => {
    render(<Modal {...defaultProps} open={false} />);

    expect(screen.queryByText('Test Title')).not.toBeInTheDocument();
    expect(screen.queryByText('Test message text')).not.toBeInTheDocument();
    expect(screen.queryByText('Confirm')).not.toBeInTheDocument();
    expect(screen.queryByText('Отмена')).not.toBeInTheDocument();
  });

  it('calls onCloseModal when cancel button is clicked', async () => {
    const user = userEvent.setup();
    render(<Modal {...defaultProps} />);

    const cancelButton = screen.getByText('Отмена');
    await user.click(cancelButton);

    expect(defaultProps.onCloseModal).toHaveBeenCalledTimes(1);
  });

  it('calls onConfirmModal when confirm button is clicked', async () => {
    const user = userEvent.setup();
    render(<Modal {...defaultProps} />);

    const confirmButton = screen.getByText('Confirm');
    await user.click(confirmButton);

    expect(defaultProps.onConfirmModal).toHaveBeenCalledTimes(1);
  });

  // Note: Backdrop click functionality is handled by Material-UI Dialog
  // The keyboard escape test covers the close functionality

  it('displays custom approve button text', () => {
    const customProps = { ...defaultProps, approveBtn: 'Delete' };
    render(<Modal {...customProps} />);

    expect(screen.getByText('Delete')).toBeInTheDocument();
  });

  it('displays custom title and text', () => {
    const customProps = {
      ...defaultProps,
      title: 'Custom Title',
      text: 'Custom message content',
    };
    render(<Modal {...customProps} />);

    expect(screen.getByText('Custom Title')).toBeInTheDocument();
    expect(screen.getByText('Custom message content')).toBeInTheDocument();
  });

  it('has correct dialog structure', () => {
    render(<Modal {...defaultProps} />);

    // Check that the dialog has the expected structure
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    // Check for dialog title
    const titleElement = screen.getByText('Test Title').closest('[id]');
    expect(titleElement).toHaveAttribute('id', expect.stringContaining('delete-dialog-title'));
  });

  it('confirm button has error color variant', () => {
    render(<Modal {...defaultProps} />);

    const confirmButton = screen.getByText('Confirm');
    expect(confirmButton).toHaveClass('MuiButton-colorError');
  });

  it('cancel button has primary color variant', () => {
    render(<Modal {...defaultProps} />);

    const cancelButton = screen.getByText('Отмена');
    expect(cancelButton).toHaveClass('MuiButton-colorPrimary');
  });

  it('confirm button has contained variant', () => {
    render(<Modal {...defaultProps} />);

    const confirmButton = screen.getByText('Confirm');
    expect(confirmButton).toHaveClass('MuiButton-contained');
  });

  it('cancel button has text variant', () => {
    render(<Modal {...defaultProps} />);

    const cancelButton = screen.getByText('Отмена');
    expect(cancelButton).toHaveClass('MuiButton-text');
  });

  it('handles keyboard interactions', async () => {
    const user = userEvent.setup();
    render(<Modal {...defaultProps} />);

    // Press Escape key
    await user.keyboard('{Escape}');
    expect(defaultProps.onCloseModal).toHaveBeenCalledTimes(1);
  });

  it('renders typography for text content', () => {
    render(<Modal {...defaultProps} />);

    const textElement = screen.getByText('Test message text');
    expect(textElement.tagName).toBe('P'); // Typography renders as <p> by default
  });
});
