import React from 'react';
import { create } from 'react-test-renderer';
import ProfileStatus from './ProfileStatus(classes - old)';

describe('ProfileStatus Component', () => {
  test('status from props should be in the state', () => {
    const component = create(<ProfileStatus status="Success" />);
    const instance = component.getInstance();
    expect(instance.state.valueStatus).toBe('Success');
  });
  test("after creation there are shoud be 'span'", () => {
    const component = create(<ProfileStatus status="Success" />);
    const { root } = component;
    const span = root.findByType('span');
    expect(span).not.toBeNull();
  });
  test("after creation 'span' should contain status", () => {
    const component = create(<ProfileStatus status="Success" />);
    const { root } = component;
    const span = root.findByType('span');
    expect(span.children[0]).toBe('Success');
  });
  test("after creation there are shoudn't be 'input'", () => {
    const component = create(<ProfileStatus status="Success" />);
    const { root } = component;
    expect(() => {
      root.findByType('inpunt');
    }).toThrow();
  });
  test("'input' should be displayed in editMode instead of 'span'", () => {
    const component = create(<ProfileStatus status="Success" />);
    const { root } = component;
    const span = root.findByType('span');
    span.props.onDoubleClick();
    const input = root.findByType('input');
    expect(input.props.value).toBe('Success');
  });
  test('callback should be called', () => {
    const mockCallback = jest.fn();
    const component = create(
      <ProfileStatus status="Success" updateStatus={mockCallback} />
    );
    const instance = component.getInstance();
    instance.deactiveteEditMode();
    expect(mockCallback.mock.calls.length).toBe(1);
  });
});
