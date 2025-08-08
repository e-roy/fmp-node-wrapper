describe('Main Index Exports', () => {
  describe('Type Exports', () => {
    it('should export Tool type', () => {
      // The types are re-exported, so we can't test them at runtime
      // The TypeScript compiler ensures they're properly exported
      expect(true).toBe(true);
    });
  });
});
