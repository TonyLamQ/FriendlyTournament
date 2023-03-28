import { TestBed } from "@angular/core/testing";

import { HttpClient, HttpHandler } from "@angular/common/http";
import { MockService } from "ng-mocks";
import { of } from "rxjs";
import { GroupService } from "./group.service";
import { IGroup } from "@friendly-tournament/data/models";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";


describe("GroupService", () => {
    let service: GroupService
    let httpMock: HttpTestingController
    let groups;

    beforeEach(() => {
        service = MockService(GroupService);

        groups = [
            {
                _id: '',
                Name: "Group 1",
                Description: "Group 1 description",
                CreatedDate: new Date(),
                predefined: true,
                __v: 0
            },
            {
                _id: '',
                Name: "Group 2",
                Description: "Group 2 description",
                CreatedDate: new Date(),
                predefined: true,
                __v: 0
            },
            {
                _id: '',
                Name: "Group 3",
                Description: "Group 3 description",
                CreatedDate: new Date(),
                predefined: true,
                __v: 0
            }
        ];

        service.getGroups = jest.fn().mockReturnValue(of(groups));
        service.createGroup = jest.fn().mockReturnValue(of(groups[0]));

        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [{ provide: GroupService, useValue: service }, HttpClient, HttpHandler]
        });
        service = TestBed.inject(GroupService);
        httpMock = TestBed.inject(HttpTestingController)
    });

    afterEach(() => {
        httpMock.verify();
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });

    it("should return a list of groups", () => {
        // let groups: IGroup[] = [];

        service.getGroups().subscribe((group: IGroup[]) => {
            groups = group;
            expect(groups.length).toBe(4);
        });

        const req = httpMock.expectOne('/api/Group/FindAll')
        expect(req.request.method).toEqual('GET')
    });

    it("should create an group", () => {
        const group = {
            _id: '',
            Name: "Group 1",
            Description: "Group 1 description",
            CreatedDate: new Date(),
        };
        console.log('aaaaaaaaaaaaaaaaa')
        service.createGroup(group).subscribe((group: IGroup) => {
            expect(group).toEqual(group);
        });
    });
});