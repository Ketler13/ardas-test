import { OnlyActivePipe } from './only-active.pipe';
import { tasks } from './mockedTasks';

describe('OnlyActivePipe', () => {
  it('works with empty arrays', () => {
    const pipe = new OnlyActivePipe();
    expect(pipe.transform([]).length).toBe(0);
  });

  it('changes valid array', () => {
    const pipe = new OnlyActivePipe();
    expect(pipe.transform(tasks).length).toBe(1);
  });
});
