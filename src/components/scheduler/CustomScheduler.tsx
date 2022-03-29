import React from 'react';
import { Table } from '@components/scheduler/table/Table';
import Table2 from '@components/scheduler/table2/Table2';

const list = [
  { id: 1, name: 'Jon De', age: 28 },
  { id: 2, name: 'XU De', age: 23 },
  { id: 3, name: 'Won De', age: 55 },
];

const data = {
  dates: ['1.12.2022', '2.12.2022', '3.12.2022', '4.12.2022', '5.12.2022'],
  lessons: [
    {
      time: '8.00',
      scheduler: [
        { id: 1, lesson: false },
        { id: 2, lesson: false },
        { id: 3, lesson: false },
        { id: 4, lesson: false },
        { id: 5, lesson: false },
      ],
    },
    {
      time: '8.30',
      scheduler: [
        { id: 1, lesson: false },
        { id: 2, lesson: false },
        { id: 3, lesson: false },
        { id: 4, lesson: false },
        { id: 5, lesson: false },
      ],
    },
    {
      time: '9.00',
      scheduler: [
        { id: 1, lesson: false },
        { id: 2, lesson: false },
        { id: 3, lesson: false },
        { id: 4, lesson: false },
        { id: 5, lesson: false },
      ],
    },
    {
      time: '9.30',
      scheduler: [
        { id: 1, lesson: false },
        { id: 2, lesson: false },
        { id: 3, lesson: false },
        { id: 4, lesson: false },
        { id: 5, lesson: false },
      ],
    },
    {
      time: '10.00',
      scheduler: [
        { id: 1, lesson: true },
        { id: 2, lesson: false },
        { id: 3, lesson: false },
        { id: 4, lesson: false },
        { id: 5, lesson: false },
      ],
    },
    {
      time: '10.30',
      scheduler: [
        { id: 1, lesson: false },
        { id: 2, lesson: false },
        { id: 3, lesson: false },
        { id: 4, lesson: false },
        { id: 5, lesson: false },
      ],
    },
    {
      time: '11.00',
      scheduler: [
        { id: 1, lesson: false },
        { id: 2, lesson: false },
        { id: 3, lesson: false },
        { id: 4, lesson: false },
        { id: 5, lesson: false },
      ],
    },
    {
      time: '11.30',
      scheduler: [
        { id: 1, lesson: false },
        { id: 2, lesson: false },
        { id: 3, lesson: false },
        { id: 4, lesson: false },
        { id: 5, lesson: false },
      ],
    },
    {
      time: '12.00',
      scheduler: [
        { id: 1, lesson: false },
        { id: 2, lesson: false },
        { id: 3, lesson: false },
        { id: 4, lesson: false },
        { id: 5, lesson: false },
      ],
    },
    {
      time: '12.30',
      scheduler: [
        { id: 1, lesson: false },
        { id: 2, lesson: false },
        { id: 3, lesson: false },
        { id: 4, lesson: false },
        { id: 5, lesson: false },
      ],
    },
    {
      time: '13.00',
      scheduler: [
        { id: 1, lesson: false },
        { id: 2, lesson: false },
        { id: 3, lesson: false },
        { id: 4, lesson: false },
        { id: 5, lesson: false },
      ],
    },
    {
      time: '13.30',
      scheduler: [
        { id: 1, lesson: false },
        { id: 2, lesson: false },
        { id: 3, lesson: false },
        { id: 4, lesson: false },
        { id: 5, lesson: false },
      ],
    },
    {
      time: '14.00',
      scheduler: [
        { id: 1, lesson: false },
        { id: 2, lesson: false },
        { id: 3, lesson: false },
        { id: 4, lesson: false },
        { id: 5, lesson: false },
      ],
    },
    {
      time: '14.30',
      scheduler: [
        { id: 1, lesson: false },
        { id: 2, lesson: false },
        { id: 3, lesson: false },
        { id: 4, lesson: false },
        { id: 5, lesson: false },
      ],
    },
    {
      time: '15.00',
      scheduler: [
        { id: 1, lesson: false },
        { id: 2, lesson: false },
        { id: 3, lesson: false },
        { id: 4, lesson: false },
        { id: 5, lesson: false },
      ],
    },
    {
      time: '15.30',
      scheduler: [
        { id: 1, lesson: false },
        { id: 2, lesson: false },
        { id: 3, lesson: false },
        { id: 4, lesson: false },
        { id: 5, lesson: false },
      ],
    },
    {
      time: '16.00',
      scheduler: [
        { id: 1, lesson: false },
        { id: 2, lesson: false },
        { id: 3, lesson: false },
        { id: 4, lesson: false },
        { id: 5, lesson: false },
      ],
    },
    {
      time: '16.30',
      scheduler: [
        { id: 1, lesson: false },
        { id: 2, lesson: false },
        { id: 3, lesson: false },
        { id: 4, lesson: false },
        { id: 5, lesson: false },
      ],
    },
    {
      time: '17.00',
      scheduler: [
        { id: 1, lesson: false },
        { id: 2, lesson: false },
        { id: 3, lesson: false },
        { id: 4, lesson: false },
        { id: 5, lesson: false },
      ],
    },
    {
      time: '17.30',
      scheduler: [
        { id: 1, lesson: false },
        { id: 2, lesson: false },
        { id: 3, lesson: false },
        { id: 4, lesson: false },
        { id: 5, lesson: false },
      ],
    },
    {
      time: '18.00',
      scheduler: [
        { id: 1, lesson: false },
        { id: 2, lesson: false },
        { id: 3, lesson: false },
        { id: 4, lesson: false },
        { id: 5, lesson: false },
      ],
    },
    {
      time: '18.30',
      scheduler: [
        { id: 1, lesson: false },
        { id: 2, lesson: false },
        { id: 3, lesson: false },
        { id: 4, lesson: false },
        { id: 5, lesson: false },
      ],
    },
    {
      time: '19.00',
      scheduler: [
        { id: 1, lesson: false },
        { id: 2, lesson: false },
        { id: 3, lesson: false },
        { id: 4, lesson: false },
        { id: 5, lesson: false },
      ],
    },
    {
      time: '19.30',
      scheduler: [
        { id: 1, lesson: false },
        { id: 2, lesson: false },
        { id: 3, lesson: false },
        { id: 4, lesson: false },
        { id: 5, lesson: false },
      ],
    },
    {
      time: '20.00',
      scheduler: [
        { id: 1, lesson: false },
        { id: 2, lesson: false },
        { id: 3, lesson: false },
        { id: 4, lesson: false },
        { id: 5, lesson: false },
      ],
    },
  ],
};

const data2 = {
  dates: ['1.12.2022', '2.12.2022', '3.12.2022', '4.12.2022', '5.12.2022'],
  lessons: [
    {
      time: ['7.30', '8.00'],
      scheduler: [
        { id: 1, lesson: false },
        { id: 2, lesson: false },
        { id: 3, lesson: false },
        { id: 4, lesson: false },
        { id: 5, lesson: false },
      ],
    },
    {
      time: ['8.30', '9.00'],
      scheduler: [
        { id: 1, lesson: false },
        { id: 2, lesson: false },
        { id: 3, lesson: false },
        { id: 4, lesson: true },
        { id: 5, lesson: false },
      ],
    },
    {
      time: ['9.30', '10.00'],
      scheduler: [
        { id: 1, lesson: true },
        { id: 2, lesson: false },
        { id: 3, lesson: false },
        { id: 4, lesson: false },
        { id: 5, lesson: false },
      ],
    },
    {
      time: ['10.30', '11.00'],
      scheduler: [
        { id: 1, lesson: false },
        { id: 2, lesson: false },
        { id: 3, lesson: false },
        { id: 4, lesson: false },
        { id: 5, lesson: false },
      ],
    },
    {
      time: ['11.30', '12.00'],
      scheduler: [
        { id: 1, lesson: false },
        { id: 2, lesson: true },
        { id: 3, lesson: false },
        { id: 4, lesson: false },
        { id: 5, lesson: false },
      ],
    },
    {
      time: ['12.30', '13.00'],
      scheduler: [
        { id: 1, lesson: false },
        { id: 2, lesson: false },
        { id: 3, lesson: false },
        { id: 4, lesson: false },
        { id: 5, lesson: true },
      ],
    },
    {
      time: ['13.30', '14.00'],
      scheduler: [
        { id: 1, lesson: false },
        { id: 2, lesson: false },
        { id: 3, lesson: false },
        { id: 4, lesson: false },
        { id: 5, lesson: false },
      ],
    },
    {
      time: ['14.30', '15.00'],
      scheduler: [
        { id: 1, lesson: false },
        { id: 2, lesson: false },
        { id: 3, lesson: true },
        { id: 4, lesson: false },
        { id: 5, lesson: false },
      ],
    },
    {
      time: ['15.30', '16.00'],
      scheduler: [
        { id: 1, lesson: false },
        { id: 2, lesson: false },
        { id: 3, lesson: false },
        { id: 4, lesson: false },
        { id: 5, lesson: false },
      ],
    },
    {
      time: ['16.30', '17.00'],
      scheduler: [
        { id: 1, lesson: false },
        { id: 2, lesson: false },
        { id: 3, lesson: false },
        { id: 4, lesson: false },
        { id: 5, lesson: false },
      ],
    },
    {
      time: ['17.30', '18.00'],
      scheduler: [
        { id: 1, lesson: false },
        { id: 2, lesson: false },
        { id: 3, lesson: false },
        { id: 4, lesson: false },
        { id: 5, lesson: false },
      ],
    },
    {
      time: ['18.30', '19.00'],
      scheduler: [
        { id: 1, lesson: false },
        { id: 2, lesson: false },
        { id: 3, lesson: false },
        { id: 4, lesson: false },
        { id: 5, lesson: false },
      ],
    },
    {
      time: ['19.30', '20.00'],
      scheduler: [
        { id: 1, lesson: false },
        { id: 2, lesson: false },
        { id: 3, lesson: false },
        { id: 4, lesson: false },
        { id: 5, lesson: false },
      ],
    },
  ],
};

const colNames = ['1.12.2022', '2.12.2022', '3.12.2022', '4.12.2022', '5.12.2022'];

const CustomScheduler = () => {
  return (
    <div>
      {/*<Table list={list} colNames={colNames} />*/}
      <Table2 data={data2} />
    </div>
  );
};

export default CustomScheduler;
