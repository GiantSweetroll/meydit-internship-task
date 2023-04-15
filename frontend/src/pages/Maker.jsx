import { Container, Typography } from '@mui/material'
import React, { useState } from 'react'
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Selection, Inject, Edit, Toolbar, Sort, Filter, Search } from '@syncfusion/ej2-react-grids';
import { useStateContext } from '../contexts/ContextProvider';
import { useNavigate } from 'react-router-dom';

export const Maker = () => {

    const { setSelectedJobDetails } = useStateContext()
    const navigate = useNavigate()
    const [jobs, setJobs] = useState([])

    const jobsGrid = [
        { 
            headerText: 'Location',
            field: 'location',
            width: '250',
            textAlign: 'Left' 
        },
        { 
            field: 'clothingType',
            headerText: 'Type of Clothing',
            width: '150',
            textAlign: 'Center' 
        },
        { 
            field: 'quotations',
            headerText: 'Quotations',
            width: '100',
            textAlign: 'Center' 
        },
        { 
            field: 'status',
            headerText: 'Status',
            width: '120',
            textAlign: 'Center',
        },
      
      ];

      const handleRowSelection = (row) => {
        setSelectedJobDetails(row.data)
        navigate('/job-deets')
      }

  return (
    <Container>
        <Typography
            color='textSecondary'
            variant='h6'
            component='h2'
            gutterBottom
        >
            Jobs
        </Typography>

        {/* Table */}
        <GridComponent
            dataSource={jobs}
            allowPaging
            allowSorting
            toolbar={['Search']}
            rowSelected={handleRowSelection}
            width='auto'
        >
            <ColumnsDirective>
            {jobsGrid.map((item, index) => (
                <ColumnDirective 
                    key={index} {...item}
                />
            ))}
            </ColumnsDirective>
            <Inject services={[Page, Toolbar, Search, Selection, Edit, Sort, Filter]} />
        </GridComponent>
    </Container>
  )
}
