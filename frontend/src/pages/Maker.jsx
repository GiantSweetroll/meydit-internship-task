import { Container, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Selection, Inject, Edit, Toolbar, Sort, Filter, Search } from '@syncfusion/ej2-react-grids';
import { useStateContext } from '../contexts/ContextProvider';
import { useNavigate } from 'react-router-dom';
import { getJobList, getUserData } from '../controllers/backendController';
import { format } from 'date-fns'

export const Maker = () => {

    const { setSelectedJobDetails, clothingTypes, statusTypes } = useStateContext()
    const navigate = useNavigate()
    const [jobs, setJobs] = useState([])
    const [userDataCollection, setUserDataCollection] = useState({})

    const jobsGrid = [
        { 
            headerText: 'Date Posted',
            field: 'datePosted',
            width: '100',
            textAlign: 'Left',
            headerTextAlign : 'Left' 
        },
        { 
            headerText: 'Posted by',
            field: 'fullName',
            width: '150',
            textAlign: 'Left',
            headerTextAlign : 'Left'
        },
        { 
            headerText: 'Location',
            field: 'location',
            width: '250',
            textAlign: 'Left',
            headerTextAlign : 'Left' 
        },
        { 
            field: 'clothingType',
            headerText: 'Type of Clothing',
            width: '150',
            textAlign: 'Center',
            headerTextAlign : 'Center'
        },
        { 
            field: 'quotations',
            headerText: 'Quotations',
            width: '100',
            textAlign: 'Center',
            headerTextAlign : 'Center'
        },
        { 
            field: 'status',
            headerText: 'Status',
            width: '120',
            textAlign: 'Left',
            headerTextAlign : 'Left'
        },
      
      ];

      const handleRowSelection = (row) => {
        setSelectedJobDetails(row.data)
        localStorage.setItem('selectedJob', JSON.stringify(row.data))
        navigate('/job-deets')
      }

    async function setupTableData() {
        const newUserDataCollection = {...userDataCollection}
        const jobsDb = await getJobList()

        const jobsList = []
        const clothingOptions = {}
        const statusOptions = {}

        clothingTypes.forEach((c) => {
            clothingOptions[c.clothingId] = c.label
        })
        statusTypes.forEach((s) => {
            statusOptions[s.id] = s.name
        })

        for (var i = 0; i < jobsDb.length; i++) {
            const job = jobsDb[i]
            const userId = job.userId
            if (!(userId in newUserDataCollection)) {
                const user = await getUserData(userId)
                newUserDataCollection[user.id] = user
            }

            jobsList.push({
                id: job.id,
                location: `${newUserDataCollection[userId].address}, ${newUserDataCollection[userId].postal} ${newUserDataCollection[userId].state}`,
                clothingType: clothingOptions[job.clothingId],
                quotations: job.quotesNum,
                phone: newUserDataCollection[userId].phone,
                status: statusOptions[job.statusId],
                desc: job.descr,
                firstName: newUserDataCollection[userId].firstname,
                lastName: newUserDataCollection[userId].lastname,
                fullName: `${newUserDataCollection[userId].firstname} ${newUserDataCollection[userId].lastname}`,
                email: newUserDataCollection[userId].email,
                budget: job.budget,
                datePosted: format(new Date(job.datePosted), 'do MMMM Y'),
            })
        }

        setJobs(jobsList)
        setUserDataCollection(newUserDataCollection)
    }

    useEffect(() => {
        setupTableData()
    }, [clothingTypes, statusTypes])

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
