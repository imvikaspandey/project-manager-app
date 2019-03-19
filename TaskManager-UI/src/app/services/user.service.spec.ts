import { UserService } from './user.service';
import { TestBed, inject, getTestBed, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';



describe('UserService', () => {
  let injector: TestBed;
  let service: UserService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    }).compileComponents().then(() => {
      injector = getTestBed();
      service = injector.get(UserService);
      httpMock = injector.get(HttpTestingController);
    });
  });

  // afterEach(async(() => {
  //   // To flush any outstanding requests
  //   httpMock.verify();
  // }));

  it('should be created', () => {
    const service: UserService = TestBed.get(UserService);
    expect(service).toBeTruthy();
  });

  it('should post a User', () => {

    const user = {
      firstName: "Testing",
      lastName: "Testing",
      employeeId: "9999"
    };

    service.createUser(user).subscribe();

    httpMock.expectOne((request) => {
      return request.method == 'POST'
        && request.url == `http://localhost:3000/api/user`
        && JSON.stringify(request.body) == JSON.stringify(user)
        && request.headers.get('Content-Type') === 'application/json';
    }).flush(user);

    httpMock.verify();

  });

  it('should update a User', () => {

    const user = {
      firstName: "Testing",
      lastName: "Testing",
      employeeId: "969696"
    };

    service.editUser('123', user).subscribe();

    httpMock.expectOne((request) => {
      return request.method == 'PUT'
        && request.url == `http://localhost:3000/api/user/123`
        && JSON.stringify(request.body) == JSON.stringify(user)
        && request.headers.get('Content-Type') === 'application/json';
    }).flush(user);

    httpMock.verify();

  });

  it('should be able to delete user with id 123', () => {

    service.deleteUsers(123).subscribe();

    httpMock.expectOne((request) => {
      return request.method == 'DELETE'
        && request.url == `http://localhost:3000/api/user/123`
    });

  });

  it('should be able to search user', () => {

    service.fetchUsers().subscribe();

    httpMock.expectOne((request) => {
      return request.method == 'GET'
        && request.url == `http://localhost:3000/api/user`
    });

  });

});
