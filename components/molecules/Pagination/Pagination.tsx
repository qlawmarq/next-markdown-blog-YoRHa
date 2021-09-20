import { Anchor } from '@/components/atoms/Typography'

export const Pagination = ({ totalPages, currentPage }) => {
  const prevPage = parseInt(currentPage) - 1 > 0
  const nextPage = parseInt(currentPage) + 1 <= parseInt(totalPages)

  return (
    <div>
      <nav>
        {!prevPage && <button disabled={!prevPage}>Previous</button>}
        {prevPage && (
          <Anchor href={currentPage - 1 === 1 ? `/blog/` : `/blog/page/${currentPage - 1}`}>
            <button>Previous</button>
          </Anchor>
        )}
        <span>
          {currentPage} of {totalPages}
        </span>
        {!nextPage && <button disabled={!nextPage}>Next</button>}
        {nextPage && (
          <Anchor href={`/blog/page/${currentPage + 1}`}>
            <button>Next</button>
          </Anchor>
        )}
      </nav>
    </div>
  )
}
