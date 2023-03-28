import { TestBed, waitForAsync } from "@angular/core/testing";

import { HttpClient, HttpHandler } from "@angular/common/http";
import { MockService } from "ng-mocks";
import { of } from "rxjs";
import { GroupService } from "./group.service";
import { IGroup } from "@friendly-tournament/data/models";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";


describe("GroupService", () => {
    let service: GroupService
    let httpMock: HttpTestingController

    beforeEach(() => {
        service = MockService(GroupService);

        service.getGroups = jest.fn().mockReturnValue(of(groups));
        service.createGroup = jest.fn().mockReturnValue(of(groups[0]));

        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [GroupService]
        });
        service = TestBed.inject(GroupService);
        httpMock = TestBed.inject(HttpTestingController)
    });

    afterEach(() => {
        httpMock.verify();
    });

    let groups: Partial<IGroup>[] = [
        {
            _id: '',
            Name: "Group 1",
            Description: "Group 1 description",
            CreatedDate: new Date(),

        },
        {
            _id: '',
            Name: "Group 2",
            Description: "Group 2 description",
            CreatedDate: new Date(),
        },
        {
            _id: '',
            Name: "Group 3",
            Description: "Group 3 description",
            CreatedDate: new Date(),
        }
    ];

    const testGroup = {
        _id: '',
        Name: "Group test",
        Description: "Group test description",
        CreatedDate: new Date(),
    };

    it("should be created", waitForAsync(() => {
        expect(service).toBeTruthy();
    }));

    it("should return a list of groups", waitForAsync(() => {

        service.getGroups().subscribe((group: IGroup[]) => {
            groups = group;
            expect(groups.length).toBe(3);
        });
        const req = httpMock.expectOne(`/api/Group/findAll`)
        expect(req.request.method).toEqual('GET')
    }));

    it("should return a group", waitForAsync(() => {
        service.getGroup('1').subscribe((group1: IGroup) => {
            expect(group1).toEqual(groups[0]);
        });

        const req = httpMock.expectOne('/api/Group/find/1')
        expect(req.request.method).toEqual('GET')
    }));

    it("should create an group", waitForAsync(() => {

        service.createGroup(testGroup).subscribe((group1: IGroup) => {
            expect(group1).toEqual(testGroup);
        });

        const req = httpMock.expectOne('/api/Group/create')
        expect(req.request.method).toEqual('POST')
    }));

    it("should update an group", waitForAsync(() => {

        service.updateGroup('1', testGroup).subscribe((group1: IGroup) => {
            expect(group1).toEqual(testGroup);
        });

        const req = httpMock.expectOne('/api/Group/edit/1')
        expect(req.request.method).toEqual('PUT')
    }));

    it("should delete an group", waitForAsync(() => {
            
            service.deleteGroup('1').subscribe((group1: IGroup) => {
                expect(group1).toEqual(testGroup);
            });
    
            const req = httpMock.expectOne('/api/Group/delete/1')
            expect(req.request.method).toEqual('DELETE')
        }
    ));



});


