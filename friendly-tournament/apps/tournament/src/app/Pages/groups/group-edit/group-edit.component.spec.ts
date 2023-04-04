import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupEditComponent } from './group-edit.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { GroupService } from '../group.service';
import { IGroup } from '@friendly-tournament/data/models';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormsModule } from '@angular/forms';
import { of } from 'rxjs';

describe('GroupEditComponent', () => {
    let component: GroupEditComponent;
    let fixture: ComponentFixture<GroupEditComponent>;

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
        getGroups: jest.fn().mockImplementation(() => of(groupList)),
        createGroup: jest.fn(),
        updateGroup: jest.fn(),
        leaveGroup: jest.fn(),
        deleteGroup: jest.fn(),
    }
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [GroupEditComponent],
            imports: [HttpClientTestingModule, FormsModule],
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

        
        fixture = TestBed.createComponent(GroupEditComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    describe('create', ()=>{
        beforeEach(() => {
            activatedRouteMock.snapshot.paramMap.get = jest.fn().mockImplementation(() => { return null });
        });

        it('should create', () => {
            expect(component).toBeTruthy();
        });

        it('should call getGroup', () => {
            expect(groupServiceMock.getGroup).toHaveBeenCalledTimes(0);
        })

        it('should give a empty form when no id is given', () => {
            const group = {
            } as IGroup;

            expect(component.group)
            expect(component.group).toEqual(group);
        });
    })

    describe('edit', ()=>{
        beforeEach(() => {
            activatedRouteMock.snapshot.paramMap.get = jest.fn().mockImplementation(() => { return '1' });
        });

        it('should create', () => {
            expect(component).toBeTruthy();
        });

        it('should call getGroup', () => {
            expect(groupServiceMock.getGroup).toHaveBeenCalled();
        })

        it('should give a form with the group when id is given', () => {
            const group = {
                _id: '1',
                Name: 'Test',
                Description: 'Test',
                CreatedDate: new Date('2021-01-01T00:00:00.000Z'),
                Entries: [],
                Invites: [],
                Users: [],
            } as IGroup;

            expect(component.group).toEqual(group);
        });
    });
});
