import { ComponentFixture, TestBed } from '@angular/core/testing';


import { HttpClientTestingModule } from '@angular/common/http/testing';
import { GroupService } from '../group.service';
import { IGroup } from '@friendly-tournament/data/models';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormBuilder, FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { GroupListComponent } from './group-list.component';

describe('GroupListComponent', () => {
    let component: GroupListComponent;
    let fixture: ComponentFixture<GroupListComponent>;

    const dummyGroup: IGroup = {
        _id: '1',
        Name: 'Test',
        Description: 'Test',
        CreatedDate: new Date('2021-01-01T00:00:00.000Z'),
        Entries: [],
        Invites: [],
        Users: [],
    }

    const dummyGroup2: IGroup = {
        _id: '2',
        Name: 'Test2',
        Description: 'Test2',
        CreatedDate: new Date(),
        Entries: [],
        Invites: [],
        Users: [],
    };

    let groupList: IGroup[] = [dummyGroup, dummyGroup2];

    const activatedRouteMock = {
        snapshot: {
            paramMap: {
                get: jest.fn().mockImplementation(() => { return null })
            }
        }
    }

    const groupServiceMock = {
        getGroup: jest.fn().mockImplementation(() => of(dummyGroup)),
        getGroups: jest.fn().mockImplementation(),
        createGroup: jest.fn(),
        updateGroup: jest.fn(),
        leaveGroup: jest.fn(),
        deleteGroup: jest.fn(),
    }
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [GroupListComponent],
            imports: [HttpClientTestingModule, FormsModule, RouterModule],
            providers: [
                {
                    provide: GroupService, useValue: groupServiceMock
                },
                {
                    provide: ActivatedRoute, useValue: activatedRouteMock
                },
                FormBuilder,
            ],
            teardown: {destroyAfterEach: true}
        }).compileComponents();

        
        fixture = TestBed.createComponent(GroupListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    describe('list', ()=>{
        beforeEach(() => {
            activatedRouteMock.snapshot.paramMap.get = jest.fn().mockImplementation(() => { return null });
        });

        it('should create', () => {
            expect(component).toBeTruthy();
        });

        it('should call getGroups', () => {
            expect(groupServiceMock.getGroups).toHaveBeenCalledTimes(2);
        })
    });

});
