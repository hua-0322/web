import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import LikeButton from './LikeButton';

describe('点赞组件测试套件', () => {
  it('初次渲染点赞数为0，点击后变为1', () => {
    render(<LikeButton />);

    // 初始状态：检查按钮是否显示“赞 0”
    const button = screen.getByRole('button', { name: /赞 0/i });
    expect(button).toBeInTheDocument();

    // 模拟用户点击
    fireEvent.click(button);

    // 点击后：检查按钮是否更新为“赞 1”
    expect(screen.getByRole('button', { name: /赞 1/i })).toBeInTheDocument();
  });
});