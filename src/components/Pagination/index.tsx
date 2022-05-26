import { Box, HStack, Stack, Text } from "@chakra-ui/react";
import { PaginationItem } from "./PaginationItem";

interface PaginationProps {
    totalCountOfRegisters: number;
    registersPerPage?: number;
    currentPage?: number;
    onPageChange: (page: number) => void;
}

const siblingsPagesCount = 1;

function generatePagesArray(from: number, to: number) {
    return [...new Array(to - from)]
        .map((_, index) => {
            return from + index + 1
        })
        .filter((page) => page > 0)
}

export function Pagination( { totalCountOfRegisters, registersPerPage = 10, currentPage = 1, onPageChange }: PaginationProps) {

    const lastPage = Math.ceil(totalCountOfRegisters / registersPerPage)

    const previousPages = currentPage > 1 
        ? generatePagesArray(currentPage - 1 - siblingsPagesCount, currentPage - 1)
        : []

    const nextPages = currentPage < lastPage
        ? generatePagesArray(currentPage, Math.min(currentPage + siblingsPagesCount, lastPage))
        : []

    return(
        <Stack
          direction={["column", "row"]}
          mt="8"
          justify="space-between"
          align="center"
          spacing="6"
        >
            <Box>
                <strong>0</strong> - <strong>10</strong> de <strong>100</strong>
            </Box>

            <HStack spacing="2">

                { currentPage > (1 + siblingsPagesCount) && (
                    <>
                        <PaginationItem onPageChange={onPageChange} number={1} />
                        { currentPage > (2 + siblingsPagesCount) && (
                            <Text color={'gray.300'} w="8" textAlign={"center"}>...</Text>
                        )}
                    </>
                ) }

                { previousPages.length > 0 && previousPages.map((page) => {
                    return <PaginationItem onPageChange={onPageChange} key={page} number={page} />
                }) }

                <PaginationItem onPageChange={onPageChange} number={currentPage} isCurrent />

                { nextPages.length > 0 && nextPages.map((page) => {
                    return <PaginationItem onPageChange={onPageChange} key={page} number={page} />
                }) }



                { (currentPage + siblingsPagesCount) < lastPage && (
                    <>
                        { (currentPage + 1 + siblingsPagesCount) < lastPage && (
                            <Text color={'gray.300'} w="8" textAlign={"center"}>...</Text>
                        ) }
                        <PaginationItem onPageChange={onPageChange} number={lastPage} />
                    </>
                ) }

            </HStack>
        </Stack>
    );
}