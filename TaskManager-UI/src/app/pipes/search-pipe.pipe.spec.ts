import { SearchPipePipe } from './search-pipe.pipe';

describe('SearchPipePipe', () => {
  let users = [{
    firstName: "My",
    lastName: "User",
    employeeId: "233"
  }, {
    firstName: "Your",
    lastName: "Name",
    employeeId: "22"
  }];
  it('create an instance', () => {
    const pipe = new SearchPipePipe();
    expect(pipe).toBeTruthy();
  });
  it('should return empty list', () => {
    const pipe = new SearchPipePipe();
    expect(pipe.transform(null, 'new')).toEqual([])
  });

  it('should return all users', () => {
    const pipe = new SearchPipePipe();
    expect(pipe.transform(users, null)).toEqual(users)
  });

  it('should return filtered user', () => {
    const pipe = new SearchPipePipe();
    expect(pipe.transform(users, 'Your')).toEqual([{
      firstName: "Your",
      lastName: "Name",
      employeeId: "22"
    }])
  });
});

