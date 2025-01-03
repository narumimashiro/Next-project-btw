import { useRouter } from 'next/router'
import React from 'react'

import { Container, Typography, Button, Grid } from '@mui/material'
import { useTranslation } from 'next-i18next'

// MyComponents
import Meta from '@/components/meta'

const NotFoundPage = () => {
  const router = useRouter()
  const { t } = useTranslation()

  return (
    <>
      <Meta pageTitle={t('STRID_cmn_pagetitle').replace('{var}', t('STRID_not_found'))} />
      <Container>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          style={{ minHeight: '100vh', textAlign: 'center' }}>
          <Typography variant="h1" style={{ fontWeight: 'bold', color: 'black' }}>
            404
          </Typography>
          <Typography variant="h6" gutterBottom style={{ color: 'gray' }}>
            Page Not Found
          </Typography>
          <Button
            variant="text"
            style={{ borderColor: 'black', color: 'black' }}
            onClick={() => router.push('/')}>
            Go to Home
          </Button>
        </Grid>
      </Container>
    </>
  )
}
export default NotFoundPage
