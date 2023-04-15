import { Container, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Selection, Inject, Edit, Toolbar, Sort, Filter, Search } from '@syncfusion/ej2-react-grids';
import { useStateContext } from '../contexts/ContextProvider';
import { useNavigate } from 'react-router-dom';
import { getJobList, getUserData } from '../controllers/backendController';

export const Maker = () => {

    const { setSelectedJobDetails, clothingTypes, statusTypes } = useStateContext()
    const navigate = useNavigate()
    const [jobs, setJobs] = useState([])
    const [userDataCollection, setUserDataCollection] = useState({})

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

    useEffect(() => {
        getJobList()
            .then((jobs) => {
                const jobsList = []
                const newUserDataCollection = {...userDataCollection}
                const clothingOptions = {}
                const statusOptions = {}

                clothingTypes.forEach((c) => {
                    clothingOptions[c.clothingId] = c.label
                })
                statusTypes.forEach((s) => {
                    statusOptions[s.id] = s.name
                })

                jobs.forEach(async (job) => {
                    const userId = job.userId
                    if (!(userId in newUserDataCollection)) {
                        const user = await getUserData(userId)
                        newUserDataCollection[user.id] = user
                    }

                    jobsList.push({
                        location: `${newUserDataCollection[userId].address}, ${newUserDataCollection[userId].postal} ${newUserDataCollection[userId].state}`,
                        clothingType: clothingOptions[job.clothingId],
                        quotations: job.quotesNum,
                        status: statusOptions[job.statusId]
                    })
                    
                });

                setJobs(jobsList)
                setUserDataCollection(newUserDataCollection)
            })
    }, [clothingTypes, statusTypes, userDataCollection])

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
