import { Box, SimpleGrid } from "@chakra-ui/react"
import DevelopmentTable from "views/admin/dataTables/components/DevelopmentTable"
import CheckTable from "views/admin/dataTables/components/CheckTable"
import ColumnsTable from "views/admin/dataTables/components/ColumnsTable"
import {
  columnsDataDevelopment,
  columnsDataCheck,
  columnsDataColumns,
} from "views/admin/dataTables/variables/columnsData"
import React from "react"
import useFetch from 'hooks/useFetch'

export default function Settings() {
  // Chakra Color Mode
  const { data: dataCheck, isLoading, error } = useFetch("table-data-check")
  const { data: dataColumns, isLoading: isLoadingColumns, error: errorColumns } =
    useFetch("table-data-columns")
  const { data: dataDevelopment, isLoading: isLoadingDevelopment, error: errorDevelopment } =
    useFetch("table-data-development")

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        mb='20px'
        columns={{ sm: 1, md: 2 }}
        spacing={{ base: "20px", xl: "20px" }}>
        {dataDevelopment && <DevelopmentTable
          columnsData={columnsDataDevelopment}
          tableData={dataDevelopment}
        />}
        {dataCheck && <CheckTable columnsData={columnsDataCheck} tableData={dataCheck} />}
        {dataColumns && <ColumnsTable
          columnsData={columnsDataColumns}
          tableData={dataColumns}
        />}
      </SimpleGrid>
    </Box>
  )
}
